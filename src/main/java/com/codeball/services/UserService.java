package com.codeball.services;

import com.codeball.exceptions.UserEmailAlreadyExistsException;
import com.codeball.model.User;
import com.codeball.model.UserRole;
import com.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    public User getUserById(long id) {
        return userRepository.findOne(id);
    }

    public User createNormalUser(User user) {
        user.setRole(UserRole.ROLE_USER.name());
        return createAnyUser(user);
    }

    @Secured("ROLE_ADMIN")
    public User createAnyUser(User user) {
        User existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (Objects.isNull(existingUserByEmail)) {
            user.setId(null);
            return userRepository.save(user);
        } else {
            throw new UserEmailAlreadyExistsException(user.getEmail());
        }
    }

    public User updateUser(long id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        userRepository.delete(id);
    }

}
