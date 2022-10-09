package msg.skillup.repository;

import msg.skillup.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
    @Query("SELECT op from OrderProduct op where op.order.user.idUser = :idUser and op.order.idOrder = :orderId")
    List<OrderProduct> findAllByUserAndOrder(@Param("orderId") Long orderId, @Param("idUser") Long userId);

    @Query("SELECT op from OrderProduct op where op.order.user.idUser = :idUser")
    List<OrderProduct> findAllByUser(@Param("idUser") Long userId);
}

