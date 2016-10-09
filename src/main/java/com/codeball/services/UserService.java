package com.codeball.services;

import com.codeball.exceptions.UserEmailAlreadyExistsException;
import com.codeball.exceptions.UserNotFoundException;
import com.codeball.model.User;
import com.codeball.model.UserRole;
import com.codeball.model.annotations.security.AdminRoleRequired;
import com.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(long id) {
        return userRepository.findOne(id);
    }

    public User createNormalUser(User user) {
        user.setRole(UserRole.ROLE_USER);
        return createAnyUser(user);
    }

    @AdminRoleRequired
    public User createAnyUser(User user) {
        Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new UserEmailAlreadyExistsException(user.getEmail());
        }

        user.setId(null);
        return userRepository.save(user);
    }

    public User updateUser(long id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        userRepository.delete(id);
    }

}
