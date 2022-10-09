
package msg.skillup.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "ORDER_PRODUCT")
@Data
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ORDER_PRODUCT")
    private Long idOrderProd;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_ORDER")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_PRODUCT")
    private Product product;

    @Column(name = "QUANTITY_ORDER_PRODUCT", nullable = false)
    private Integer quantity;
}

