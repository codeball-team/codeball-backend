package com.codete.codeball.utils;

import com.codete.codeball.model.User;
import com.codete.codeball.model.UserRole;
import com.codete.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Principal;
import java.util.Map;

@Component
public class ContextUtils {

    public static final String AUTH_DETAILS_GIVEN_NAME = "given_name";
    public static final String AUTH_DETAILS_FAMILY_NAME = "family_name";
    public static final String AUTH_DETAILS_EMAIL = "email";
    public static final String AUTH_DETAILS_PICTURE = "picture";
    public static final String AUTH_DETAILS_ROLE = "role";

    @Autowired
    private UserRepository userRepository;

    public User getUser(Principal principal) {
        String userEmail = this.extractEmail(principal);
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            user = this.createUserOf(principal);
            userRepository.save(user);
        }
        return user;
    }

    public User createUserOf(Principal principal) {
        return User.builder()
                .email(this.extractEmail(principal))
                .firstName(this.extractFirstName(principal))
                .lastName(this.extractLastName(principal))
                .pictureUrl(this.extractPictureUrl(principal))
                .role(this.extractUserRole(principal))
                .build();
    }

    private String extractFirstName(Principal principal) {
        return getAuthenticationDetails(principal).get(AUTH_DETAILS_GIVEN_NAME);
    }

    private String extractLastName(Principal principal) {
        return getAuthenticationDetails(principal).get(AUTH_DETAILS_FAMILY_NAME);
    }

    private String extractEmail(Principal principal) {
        return getAuthenticationDetails(principal).get(AUTH_DETAILS_EMAIL);
    }

    private String extractPictureUrl(Principal principal) {
        return getAuthenticationDetails(principal).get(AUTH_DETAILS_PICTURE);
    }

    private String extractUserRole(Principal principal) {
        String role = getAuthenticationDetails(principal).get(AUTH_DETAILS_ROLE);
        if (StringUtils.isEmpty(role)) {
            role = UserRole.ROLE_USER.name();
        }
        return role;
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> getAuthenticationDetails(Principal principal) {
        return ((Map<String, String>) ((Authentication) principal).getDetails());
    }

}
