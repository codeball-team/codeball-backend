package com.codeball.utils;

import com.codeball.exceptions.AuthenticationException;
import com.codeball.model.User;
import com.codeball.model.UserRole;
import com.codeball.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Map;
import java.util.Objects;

@Component
public class SecurityContextUtils {

    public static final String AUTH_DETAILS_GIVEN_NAME = "given_name";
    public static final String AUTH_DETAILS_FAMILY_NAME = "family_name";
    public static final String AUTH_DETAILS_EMAIL = "email";
    public static final String AUTH_DETAILS_PICTURE = "picture";
    public static final String AUTH_DETAILS_ROLE = "role";

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, String> authenticationDetails = getAuthenticationDetails(authentication);
        String userEmail = this.extractEmail(authenticationDetails);
        User user = userRepository.findByEmail(userEmail);
        if (Objects.nonNull(user)) {
            return user;
        }
        throw new AuthenticationException();
    }

    public User createUserIfNotExists(Principal principal) {
        Map<String, String> authenticationDetails = getAuthenticationDetails(principal);
        String userEmail = this.extractEmail(authenticationDetails);
        User user = userRepository.findByEmail(userEmail);
        if (Objects.nonNull(user)) {
            return user;
        } else {
            return createUser(principal, userEmail);
        }
    }

    @Transactional
    private synchronized User createUser(Principal principal, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (Objects.nonNull(user)) {
            return user;
        } else {
            user = this.createUserOf(principal);
            return userRepository.save(user);
        }
    }

    public long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    private User createUserOf(Principal principal) {
        Map<String, String> authenticationDetails = getAuthenticationDetails(principal);
        return User.builder()
                .email(this.extractEmail(authenticationDetails))
                .firstName(this.extractFirstName(authenticationDetails))
                .lastName(this.extractLastName(authenticationDetails))
                .pictureUrl(this.extractPictureUrl(authenticationDetails))
                .role(this.extractUserRole(authenticationDetails))
                .build();
    }

    private String extractFirstName(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_GIVEN_NAME);
    }

    private String extractLastName(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_FAMILY_NAME);
    }

    private String extractEmail(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_EMAIL);
    }

    private String extractPictureUrl(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_PICTURE);
    }

    private String extractPrincipalProperty(Map<String, String> authenticationDetails, String property) {
        if (authenticationDetails.containsKey(property)) {
            return authenticationDetails.get(property);
        } else {
            throw new AuthenticationException("Missing authentication information: " + property);
        }
    }

    private String extractUserRole(Map<String, String> authenticationDetails) {
        if (authenticationDetails.containsKey(AUTH_DETAILS_ROLE)) {
            return authenticationDetails.get(AUTH_DETAILS_ROLE);
        } else {
            return UserRole.ROLE_USER.name();
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> getAuthenticationDetails(Principal principal) {
        if (principal instanceof OAuth2Authentication) {
            OAuth2Authentication oauth2Principal = (OAuth2Authentication) principal;
            Authentication userAuthentication = oauth2Principal.getUserAuthentication();
            Object authenticationDetails = userAuthentication.getDetails();
            if (authenticationDetails instanceof Map) {
                return (Map<String, String>) authenticationDetails;
            }
        }
        throw new AuthenticationException("Invalid OAuth2 authentication.");
    }

}
