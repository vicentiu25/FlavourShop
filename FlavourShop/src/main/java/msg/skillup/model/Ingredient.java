package msg.skillup.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "INGREDIENT")
@Data
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_INGREDIENT")
    private Long idIngredient;

    @Column(name = "PRICE_INGREDIENT", nullable = false)
    private Double priceIngredient;

    @Column(name = "NAME_INGREDIENT", nullable = false)
    private String nameIngredient;
}

