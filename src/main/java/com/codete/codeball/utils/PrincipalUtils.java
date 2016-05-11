package com.codete.codeball.utils;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Map;

@Component
public class PrincipalUtils {

    public String extractFirstName(Principal principal) {
        return getAuthenticationDetails(principal).get("given_name");
    }

    public String extractLastName(Principal principal) {
        return getAuthenticationDetails(principal).get("family_name");
    }

    public String extractEmail(Principal principal) {
        return getAuthenticationDetails(principal).get("email");
    }

    public String extractPictureUrl(Principal principal) {
        return getAuthenticationDetails(principal).get("picture");
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> getAuthenticationDetails(Principal principal) {
        return ((Map<String, String>) ((OAuth2Authentication) principal).getUserAuthentication().getDetails());
    }

}
