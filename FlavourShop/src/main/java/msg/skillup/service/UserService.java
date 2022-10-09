package msg.skillup.service;

import msg.skillup.configuration.JWTokenCreator;
import msg.skillup.converter.UserConverter;
import msg.skillup.dto.ForgotPasswordDTO;
import msg.skillup.dto.UserDTO;
import msg.skillup.model.Role;
import msg.skillup.model.User;
import msg.skillup.configuration.JWTokenCreator;
import msg.skillup.converter.UserConverter;
import msg.skillup.exception.BusinessException;
import msg.skillup.repository.RoleRepository;
import msg.skillup.repository.UserRepository;
import msg.skillup.validator.UserValidator;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTokenCreator jwTokenCreator;

    @Autowired
    private JavaMailSender mailSender;

    public User saveUser(UserDTO userDTO)
            throws BusinessException, UnsupportedEncodingException, MessagingException {
        User user = UserConverter.convertFromDTOToEntity(userDTO);
        UserValidator.errorList.clear();
        userValidator.validate(user);
        if (UserValidator.errorList.isEmpty()) {
            Role role = roleRepository.getById(2);
            user.setRole(role);
            String randomCode = RandomString.make(64);
            user.setVerificationCode(randomCode);
            user.setEnabled(false);
            User savedUser = userRepository.save(user);
            sendVerificationEmail(user);
            return savedUser;
        } else {
            throw new BusinessException(UserValidator.errorList.toString());
        }
    }

    public void resetPassword(ForgotPasswordDTO forgotPasswordDTO) throws BusinessException{
        User user = userRepository.findByVerificationCode(forgotPasswordDTO.getVerificationCode());
        if(user != null){
            if(!forgotPasswordDTO.getConfirmationPassword().equals(forgotPasswordDTO.getPassword()))
                throw new BusinessException("passwords do not match");
            String error = userValidator.validatePassword(user, forgotPasswordDTO.getPassword());
            System.out.println();
            if (error == null) {
                userRepository.updatePassword(user.getPassword(), user.getIdUser());
                userRepository.updateCode(null, user.getIdUser());
            } else {
                throw new BusinessException(error);
            }
        } else {
            throw new BusinessException("password already reset");
        }
    }

    private void sendVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "flavourshopskillup@outlook.com";
        String senderName = "FlavourShop";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "FlavourShop.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        String verifyURL = "http:/localhost:4200" + "/email-confirmation?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
        System.out.printf("email send");
    }

    public void sendResetEmail(String username)
            throws MessagingException, UnsupportedEncodingException, BusinessException {
        User user = getUserFromUsername(username);
        String toAddress = user.getEmail();
        String fromAddress = "flavourshopskillup@outlook.com";
        String senderName = "FlavourShop";
        String subject = "Forgot password";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to reset your password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">RESET</a></h3>"
                + "Thank you,<br>"
                + "FlavourShop.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        userRepository.updateCode(randomCode, user.getIdUser());

        content = content.replace("[[name]]", user.getName());
        String resetURL = "http:/localhost:4200" + "/reset?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", resetURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }

    }

    public String matchUser(String username, String password) throws BusinessException {
        User user = userRepository.matchUser(username);

        if(user == null){
            throw new BusinessException("This user does not exist");
        } else if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BusinessException("Incorrect password");
        } else if (!user.isEnabled()) {
            throw new BusinessException("Your email was not verified");
        }
        return jwTokenCreator.generateToken(user);
    }

    public User getUserFromUsername(String username) throws BusinessException{
        User user = userRepository.matchUser(username);
        if(user == null){
            throw new BusinessException("This user does not exist");
        }
        return user;
    }

}

