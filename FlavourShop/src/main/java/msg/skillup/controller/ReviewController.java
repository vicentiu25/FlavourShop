package msg.skillup.controller;

import msg.skillup.configuration.JWTokenCreator;
import msg.skillup.dto.ReviewDTO;
import msg.skillup.exception.BusinessException;
import msg.skillup.service.ReviewService;
import msg.skillup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private JWTokenCreator jwTokenCreator;

    @Autowired
    private UserService userService;

    @GetMapping("/reviews/product/{productId}")
    @Transactional
    public ResponseEntity<List<ReviewDTO>> getAllByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getAllReviewsByProduct(productId));
    }

    @PostMapping("/review")
    public ResponseEntity<String> addReview(@RequestBody ReviewDTO reviewDTO, @RequestHeader("Authorization") String token) throws BusinessException {
        System.out.println("Reveu "+reviewDTO.getIdProduct()+" "+reviewDTO.getRating());
        String jwtToken= token.substring(17);
        jwtToken = jwtToken.substring(0,jwtToken.length()-2);
        Long idUser = userService.getUserFromUsername(jwTokenCreator.getUsernameFromToken(jwtToken)).getIdUser();
        reviewService.addReview(reviewDTO, idUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
