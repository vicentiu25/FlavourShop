package msg.skillup.converter;

import msg.skillup.dto.UserDTO;
import msg.skillup.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserConverter {
    public static UserDTO convertFromEntityToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setIdUser(user.getIdUser());
        userDTO.setUsername(user.getUsername());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        return userDTO;
    }

    public static User convertFromDTOToEntity(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        return user;
    }

    public static List<UserDTO> convertEntitiesToDTOs(List<User> users) {
        return users.stream().map(UserConverter::convertFromEntityToDTO).collect(Collectors.toList());
    }
}


