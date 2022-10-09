package msg.skillup.repository;

import msg.skillup.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT rw from Review rw where rw.product.idProduct = :productId")
    List<Review> findAllByProduct(@Param("productId") Long productId);

}
