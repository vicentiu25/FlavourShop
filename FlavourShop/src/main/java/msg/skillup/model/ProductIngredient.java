package msg.skillup.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "PRODUCT_INGREDIENT")
@Data
public class ProductIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PRODUCT_INGREDIENT")
    private Long idProdIngred;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_INGREDIENT")
    private Ingredient ingredient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_ORDER_PRODUCT")
    private OrderProduct orderProduct;
}

