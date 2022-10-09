package msg.skillup.model;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name = "USER_TABLE")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USER")
    private Long idUser;

    @NotBlank(message = "username should not be blank")
    @Size(min = 3, message = "username should be at least 3 chars")
    @Size(max = 15, message = "username should be at most 15 chars")
    @Column(name = "USERNAME", nullable = false)
    private String username;

    @NotBlank(message = "name should not be blank")
    @Size(min = 3, message = "name should be at least 3 chars")
    @Column(name = "NAME", nullable = false)
    private String name;

    @NotBlank(message = "username should not be blank")
    @Column(name = "PASSWORD", length = 64, nullable = false)
    private String password;

    @NotBlank(message = "email should not be blank")
    @Email(message = "not a valid email address")
    @Column(name = "EMAIL")
    private String email;

    @NotBlank(message = "phoneNumber should not be blank")
    @Pattern(regexp = "^[0][7][0-9]{8}$")
    @Column(name = "PHONE_NUMBER", length = 10)
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "ID_ROLE")
    private Role role;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @Column(name = "enabled")
    private boolean enabled;
}