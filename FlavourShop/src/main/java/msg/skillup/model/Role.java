package msg.skillup.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "ROLE")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ROLE")
    private Integer idRole;

    @Column(name = "NAME_ROLE", nullable = false)
    private String nameRole;
}

