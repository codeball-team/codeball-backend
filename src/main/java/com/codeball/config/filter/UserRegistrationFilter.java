package com.codeball.config.filter;

import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class UserRegistrationFilter extends UserSecurityContextFilter {

    @Autowired
    public UserRegistrationFilter(SecurityContextUtils securityContextUtils) {
        super(securityContextUtils);
    }

    @Override
    protected Object provideAuthenticationDetails(Authentication authentication) {
        if (authentication instanceof OAuth2Authentication) {
            return ((OAuth2Authentication) authentication).getUserAuthentication().getDetails();
        } else {
            return authentication.getDetails();
        }
    }

}