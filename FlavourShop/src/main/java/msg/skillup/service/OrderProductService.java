package msg.skillup.service;

import com.itextpdf.text.DocumentException;
import msg.skillup.configuration.PdfCreator;
import msg.skillup.converter.OrderConverter;
import msg.skillup.converter.ProductConverter;
import msg.skillup.dto.OrderDTO;
import msg.skillup.dto.ProductDTO;
import msg.skillup.model.*;
import msg.skillup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Service
public class OrderProductService {
    @Autowired
    private OrderProductRepository orderProductRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private ProductIngredientRepository productIngredientRepository;

    @Autowired
    private PdfCreator pdfCreator;

    @Autowired
    private JavaMailSender mailSender;

    public OrderDTO getOrderByUser(Long orderId, Long userId){
        List<OrderProduct> orders = orderProductRepository.findAllByUserAndOrder(orderId, userId);
        List<ProductDTO> products = new ArrayList<>();
        orders.forEach(el -> {
            ProductDTO productDTO = null;
            try {
                productDTO = ProductConverter.convertFromEntityToDTO(el.getProduct());
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            productDTO.setQuantityProduct(el.getQuantity());
            products.add(productDTO);
        });
        OrderDTO orderDTO = new OrderDTO();
        if (!orders.isEmpty()) {
            orderDTO = OrderConverter.convertFromEntityToDTO(orders.get(0));
            orderDTO.setProducts(products);
        }

        return orderDTO;
    }

    public List<OrderDTO> getAllOrdersByUser(Long userId) {
        List<OrderProduct> orders = orderProductRepository.findAllByUser(userId);
        Map<Long, List<OrderProduct>> orderMap = orders.stream().collect(groupingBy(e -> e.getOrder().getIdOrder(), toList()));
        List<OrderDTO> ordersResult = new ArrayList<>();
        OrderDTO order;
        for (Long orderId : orderMap.keySet()) {
            List<ProductDTO> products = new ArrayList<>();
            orderMap.get(orderId).forEach(el -> {
                ProductDTO productDTO = null;
                try {
                    productDTO = ProductConverter.convertFromEntityToDTO(el.getProduct());
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
                productDTO.setQuantityProduct(el.getQuantity());
                products.add(productDTO);
            });
            order = OrderConverter.convertFromEntityToDTO(orderMap.get(orderId).get(0));
            order.setProducts(products);
            ordersResult.add(order);
        }
        return ordersResult;
    }

    public void saveOrder(OrderDTO orderDTO, Long idUser) throws DocumentException, IOException, MessagingException {
        User user = userRepository.getById(idUser);
        Order order = OrderConverter.convertFromDTOToEntity(orderDTO);
        order.setUser(user);
        Order savedOrder = orderRepository.save(order);
        orderDTO.getProducts().forEach(p -> {
            Product product = productRepository.getById(p.getIdProduct());
            if(product.getStockProduct() <= p.getQuantityProduct()){
                throw new RuntimeException("product is not in the stock!");
            }
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(savedOrder);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(p.getQuantityProduct());
            orderProductRepository.save(orderProduct);
            product.setStockProduct(product.getStockProduct()- p.getQuantityProduct());
            productRepository.updateProduct(product.getIdProduct(), product.getStockProduct());
            if(p.getIngredients() != null) {
                p.getIngredients().forEach(i -> {
                    Ingredient ingredient = ingredientRepository.getById(i.getIdIngredient());
                    ProductIngredient productIngredient = new ProductIngredient();
                    productIngredient.setOrderProduct(orderProduct);
                    productIngredient.setIngredient(ingredient);
                    productIngredientRepository.save(productIngredient);
                });
            }
        });
        pdfCreator.createPdf(order, orderDTO, user);

        sendOrderEmail(order, user, new File("src/main/resources/orders/Order#" + order.getIdOrder() + ".pdf"));
    }
    private void sendOrderEmail(Order order, User user, File file)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "flavourshopskillup@outlook.com";
        String senderName = "FlavourShop";
        String subject = "Thank you for your order";
        String content = "Dear [[name]],<br>"
                + "We’re happy to let you know that we’ve received your order.<br>"
                + "Your order is on its way. Your order details can be found below.<br>"
                + "Thank you,<br>"
                + "FlavourShop.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, 1);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());

        helper.setText(content, true);
        helper.addAttachment("Order#" + order.getIdOrder() + ".pdf", file);
        mailSender.send(message);
    }
}
