package com.codete.codeball.utils;

import com.codete.codeball.model.User;
import com.codete.codeball.model.UserRole;
import com.codete.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Map;

@Component
public class ContextUtils {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User getUser(Principal principal) {
        String userEmail = this.extractEmail(principal);
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            user = this.createUserOf(principal);
            userRepository.save(user);
        }
        return user;
    }

    private String extractFirstName(Principal principal) {
        return getAuthenticationDetails(principal).get("given_name");
    }

    private String extractLastName(Principal principal) {
        return getAuthenticationDetails(principal).get("family_name");
    }

    private String extractEmail(Principal principal) {
        return getAuthenticationDetails(principal).get("email");
    }

    private String extractPictureUrl(Principal principal) {
        return getAuthenticationDetails(principal).get("picture");
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> getAuthenticationDetails(Principal principal) {
        return ((Map<String, String>) ((OAuth2Authentication) principal).getUserAuthentication().getDetails());
    }

    public User createUserOf(Principal principal) {
        return User.builder()
                .email(this.extractEmail(principal))
                .firstName(this.extractFirstName(principal))
                .lastName(this.extractLastName(principal))
                .pictureUrl(this.extractPictureUrl(principal))
                .role(UserRole.ROLE_USER.name())
                .build();
    }

}
