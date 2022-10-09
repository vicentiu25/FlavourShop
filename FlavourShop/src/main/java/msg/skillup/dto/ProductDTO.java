package msg.skillup.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private Long idProduct;
    private Double priceProduct;
    private String nameProduct;
    private Integer stock;
    private Integer quantityProduct;
    private Integer rating;
    private String description;
    private String imgProduct;
    private List<IngredientDTO> ingredients;
    private Integer noRatings;
}
