package msg.skillup.converter;

import msg.skillup.dto.ReviewDTO;
import msg.skillup.model.Product;
import msg.skillup.model.Review;

import java.util.List;
import java.util.stream.Collectors;

public class ReviewConverter {
    public static ReviewDTO convertFromEntityToDTO(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setRating(review.getRating());
        reviewDTO.setIdProduct(review.getProduct().getIdProduct());
        return reviewDTO;
    }

    public static Review convertFromDTOToEntity(ReviewDTO reviewDTO, Product product) {
        Review review = new Review();
        review.setIdReview(reviewDTO.getIdReview());
        review.setRating(reviewDTO.getRating());
        review.setProduct(product);
        return review;
    }

    public static List<ReviewDTO> convertEntitiesToDTOs(List<Review> reviews) {
        return reviews.stream().map(ReviewConverter::convertFromEntityToDTO).collect(Collectors.toList());
    }
}
