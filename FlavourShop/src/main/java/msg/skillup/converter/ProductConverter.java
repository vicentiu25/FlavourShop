package msg.skillup.converter;

import msg.skillup.dto.ProductDTO;
import msg.skillup.model.Product;

import java.sql.SQLException;
import msg.skillup.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

public class ProductConverter {
    public static ProductDTO convertFromEntityToDTO(Product product) throws SQLException {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setIdProduct(product.getIdProduct());
        productDTO.setNameProduct(product.getNameProduct());
        productDTO.setPriceProduct(product.getPriceProduct());
        productDTO.setDescription(product.getDescription());
        productDTO.setImgProduct("http://localhost:8080/image/" + product.getIdProduct());
        productDTO.setRating(productDTO.getRating());
        return productDTO;
    }

    public static List<ProductDTO> convertEntitiesToDTOs(List<Product> products) {

        return products.stream().map(product -> {
            try {
               return convertFromEntityToDTO(product);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

    public static Product convertFromDTOtoEntity(ProductDTO productDTO) throws SQLException {
       Product product = new Product();
        product.setIdProduct(productDTO.getIdProduct());
        product.setPriceProduct(productDTO.getPriceProduct());
        product.setNameProduct(productDTO.getNameProduct());
        product.setStockProduct(productDTO.getQuantityProduct());
        product.setDescription(productDTO.getDescription());
        return product;
    }
}
