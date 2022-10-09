package msg.skillup.repository;

import msg.skillup.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.nameProduct LIKE  :productName")
    List<Product> findByName(@Param("productName") String productName);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.idProduct= :productId")
    Integer findRating(@Param("productId") Long productId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.idProduct= :productId")
    Integer findNoRatings(@Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("UPDATE Product pr SET pr.active=false  WHERE pr.idProduct= :idProduct")
    void updateProduct(@Param("idProduct") Long idProduct);

    @Modifying
    @Transactional
    @Query("UPDATE Product pr SET pr.stockProduct= :stock  WHERE pr.idProduct= :idProduct")
    void updateProduct(@Param("idProduct") Long idProduct,@Param("stock") Integer stock);
}

