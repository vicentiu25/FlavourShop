package msg.skillup.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import lombok.val;
import msg.skillup.configuration.JWTokenCreator;
import msg.skillup.converter.RoleConverter;
import msg.skillup.dto.*;
import msg.skillup.exception.BusinessException;
import msg.skillup.model.Role;
import msg.skillup.model.User;
import msg.skillup.service.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.mail.MessagingException;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JWTokenCreator jwTokenCreator;

    @PostMapping("/user")
    public void save(@RequestBody @Valid UserDTO userDTO)
            throws UnsupportedEncodingException, MessagingException {
        try {
            userService.saveUser(userDTO);
            ResponseEntity.ok();
        } catch (BusinessException businessException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, businessException.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenRespDTO> loginUser(@RequestBody UserDTO userDTO) {
        try {
            String token = userService.matchUser(userDTO.getUsername(), userDTO.getPassword());
            return ResponseEntity.ok(new TokenRespDTO(token));
        } catch (BusinessException businessException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, businessException.getMessage());
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<EmailConfirmationDTO> verifyUser(@Param("code") String code) {
        val emailConfirmationDTO = new EmailConfirmationDTO();
        emailConfirmationDTO.setConfirmed(userService.verify(code));
        return ResponseEntity.ok(emailConfirmationDTO);
    }

    @GetMapping("/user/role")
    public ResponseEntity<RoleDTO> roleUser(@RequestHeader("Authorization") String token){
        String jwtToken= token.substring(17);
        jwtToken = jwtToken.substring(0,jwtToken.length()-2);
        Role role = null;
        try {
            role = userService.getUserFromUsername(jwTokenCreator.getUsernameFromToken(jwtToken)).getRole();
            return ResponseEntity.ok(RoleConverter.convertFromEntityToDTO(role));
        } catch (BusinessException businessException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, businessException.getMessage());
        }
    }

    @GetMapping("/reset")
    public ResponseEntity<String> resetPassword(@Param("username") String username) throws MessagingException, UnsupportedEncodingException {
        try {
            userService.sendResetEmail(username);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BusinessException businessException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, businessException.getMessage());
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<EmailConfirmationDTO> updatePassword(@Param("code") String code, @RequestBody ForgotPasswordDTO forgotPasswordDTO){
        EmailConfirmationDTO emailConfirmationDTO = new EmailConfirmationDTO();
        try {
            forgotPasswordDTO.setVerificationCode(code);
            userService.resetPassword(forgotPasswordDTO);
            emailConfirmationDTO.setConfirmed(true);
            return ResponseEntity.ok(emailConfirmationDTO);
        } catch (BusinessException businessException) {
            emailConfirmationDTO.setConfirmed(false);
            return ResponseEntity.ok(emailConfirmationDTO);
        }
    }

}
