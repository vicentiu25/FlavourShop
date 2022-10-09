package msg.skillup.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long idReview;
    private Long idProduct;
    private Integer rating;
}
