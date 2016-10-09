package com.codeball.utils;

import com.codeball.exceptions.AuthenticationException;
import com.codeball.model.User;
import com.codeball.model.UserRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AuthenticationExtractor {

    public static final String AUTH_DETAILS_GIVEN_NAME = "given_name";
    public static final String AUTH_DETAILS_FAMILY_NAME = "family_name";
    public static final String AUTH_DETAILS_EMAIL = "email";
    public static final String AUTH_DETAILS_PICTURE = "picture";
    public static final String AUTH_DETAILS_ROLE = "role";

    public User createUserFromAuthentication(Authentication authentication) {
        Map<String, String> authenticationDetails = getAuthenticationDetailsMap(authentication);
        return User.newUser(
                this.extractEmail(authenticationDetails),
                this.extractFirstName(authenticationDetails),
                this.extractLastName(authenticationDetails),
                this.extractUserRole(authenticationDetails),
                this.extractPictureUrl(authenticationDetails));
    }

    private String extractFirstName(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_GIVEN_NAME);
    }

    private String extractLastName(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_FAMILY_NAME);
    }

    public String extractEmail(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_EMAIL);
    }

    private String extractPictureUrl(Map<String, String> authenticationDetails) {
        return extractPrincipalProperty(authenticationDetails, AUTH_DETAILS_PICTURE);
    }

    private String extractPrincipalProperty(Map<String, String> authenticationDetails, String property) {
        if (authenticationDetails.containsKey(property)) {
            return authenticationDetails.get(property);
        }
        throw new AuthenticationException("Missing authentication information: " + property);
    }

    private UserRole extractUserRole(Map<String, String> authenticationDetails) {
        if (authenticationDetails.containsKey(AUTH_DETAILS_ROLE)) {
            return UserRole.valueOf(authenticationDetails.get(AUTH_DETAILS_ROLE));
        }
        return UserRole.ROLE_USER;
    }

    @SuppressWarnings("unchecked")
    public Map<String, String> getAuthenticationDetailsMap(Authentication authentication) {
        Object authenticationDetails = getAuthenticationDetails(authentication);
        if (authenticationDetails instanceof Map) {
            return (Map<String, String>) authenticationDetails;
        }
        throw new AuthenticationException("Invalid OAuth2 authentication.");
    }

    public Object getAuthenticationDetails(Authentication authentication) {
        if (authentication instanceof OAuth2Authentication) {
            return ((OAuth2Authentication) authentication).getUserAuthentication().getDetails();
        } else {
            return authentication.getDetails();
        }
    }

}
