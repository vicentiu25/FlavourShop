package msg.skillup.repository;

import msg.skillup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT us FROM User us WHERE us.username= :username")
    User matchUser(@Param("username") String username);

    @Query("SELECT COUNT(us.idUser) FROM User us WHERE us.username= :username")
    int existsUsername(@Param("username") String username);

    @Query("SELECT us FROM User us WHERE us.verificationCode= :code")
    User findByVerificationCode(@Param("code") String code);

    @Modifying
    @Transactional
    @Query("UPDATE User us SET us.password= :password  WHERE us.idUser= :idUser")
    void updatePassword(@Param("password") String password, @Param("idUser") Long idUser);

    @Modifying
    @Transactional
    @Query("UPDATE User us SET us.verificationCode= :code  WHERE us.idUser= :idUser")
    void updateCode(@Param("code") String code, @Param("idUser") Long idUser);
}

