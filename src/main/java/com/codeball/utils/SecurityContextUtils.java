package com.codeball.utils;

import com.codeball.exceptions.UserNotFoundException;
import com.codeball.model.User;
import com.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Component
public class SecurityContextUtils {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationExtractor authenticationExtractor;

    @Transactional(noRollbackFor = UserNotFoundException.class)
    public User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, String> authenticationDetails = authenticationExtractor.getAuthenticationDetailsMap(authentication);
        String userEmail = authenticationExtractor.extractEmail(authenticationDetails);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException(userEmail));
    }

    public long currentUserId() {
        return currentUser().takeId();
    }

    public User findOrCreateAppUser(Authentication authentication) {
        Map<String, String> authenticationDetails = authenticationExtractor.getAuthenticationDetailsMap(authentication);
        String userEmail = authenticationExtractor.extractEmail(authenticationDetails);
        return userRepository.findByEmail(userEmail)
                .orElse(createUser(authentication, userEmail));
    }

    @Transactional
    private synchronized User createUser(Authentication authentication, String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isPresent()) {
            return user.get();
        } else {
            User newUser = authenticationExtractor.createUserFromAuthentication(authentication);
            return userRepository.save(newUser);
        }
    }

    public Object getAuthenticationDetails(Authentication authentication) {
        return authenticationExtractor.getAuthenticationDetails(authentication);
    }

}
