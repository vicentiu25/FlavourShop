package msg.skillup.configuration;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import msg.skillup.dto.IngredientDTO;
import msg.skillup.dto.OrderDTO;
import msg.skillup.dto.ProductDTO;
import msg.skillup.model.*;
import msg.skillup.repository.IngredientRepository;
import msg.skillup.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class PdfCreator {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private IngredientRepository ingredientRepository;
    public FileOutputStream createPdf(Order order, OrderDTO orderDTO, User user) throws IOException, DocumentException {
        Document document = new Document();
        FileOutputStream fileOutputStream = new FileOutputStream("src/main/resources/orders/Order#" + order.getIdOrder() + ".pdf");
        PdfWriter.getInstance(document, fileOutputStream);
        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
        String content = "Order#" + order.getIdOrder() +
                "\n\nClient: " + user.getName() +
                "\nDelivery Address: " + order.getAddress() + "\n\n";
        int price = 0;
        int noProduct = 1;
        for(ProductDTO p : orderDTO.getProducts()){
            Product product = productRepository.getById(p.getIdProduct());
            content += "\n" + noProduct + ". " + p.getNameProduct() + "\n";
            noProduct++;
            price+=p.getPriceProduct() * p.getQuantityProduct();
            if(p.getIngredients() != null) {
                for(IngredientDTO i: p.getIngredients()) {
                    Ingredient ingredient = ingredientRepository.getById(i.getIdIngredient());
                    content += "    " + i.getNameIngredient() + "\n";
                    price += i.getPriceIngredient() * p.getQuantityProduct();
                }
            }
        }
        content += "\nTotal Price: " + price + "RON";
        content += "\n\n Thank you for your order,\n FlavourShop";
        document.add(new Paragraph(content));
        document.close();
        return fileOutputStream;
    }
}
