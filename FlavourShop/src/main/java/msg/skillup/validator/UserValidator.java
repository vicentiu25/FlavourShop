package msg.skillup.validator;

import msg.skillup.model.User;
import msg.skillup.repository.ProductRepository;
import msg.skillup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserValidator implements Validator<User> {
    private static final String regexPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<String> validate(User user) {
        if(user.getPassword().matches(regexPassword))
        {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        else {
            errorList.add("password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:");
        }

        if(userRepository.existsUsername(user.getUsername()) > 0){
            errorList.add("username is already taken!");
        }
        return errorList;
    }

    @Override
    public String validatePassword(User user, String password) {
        if(password.matches(regexPassword))
        {
            user.setPassword(passwordEncoder.encode(password));
            return null;
        }
        else {
            return "password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:";
        }
    }


}
