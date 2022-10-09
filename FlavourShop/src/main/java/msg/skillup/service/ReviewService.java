package msg.skillup.service;

import msg.skillup.dto.ReviewDTO;
import msg.skillup.model.Product;
import msg.skillup.model.Review;
import msg.skillup.converter.ReviewConverter;
import msg.skillup.repository.ProductRepository;
import msg.skillup.repository.ReviewRepository;
import msg.skillup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<ReviewDTO> getAllReviewsByProduct(Long productId) {
        List<Review> reviews = reviewRepository.findAllByProduct(productId);
        return ReviewConverter.convertEntitiesToDTOs(reviews);
    }

    public void addReview(ReviewDTO reviewDTO, Long idUser){
        Product product = productRepository.getById(reviewDTO.getIdProduct());
        Review review = ReviewConverter.convertFromDTOToEntity(reviewDTO, product);
        review.setUser(userRepository.getById(idUser));
        reviewRepository.save(review);
    }


}
