package com.codeball.config.filter;

import com.codeball.utils.SecurityContextUtils;
import org.springframework.security.core.Authentication;

public class UserDetailsSettingFilter extends UserSecurityContextFilter {

    public UserDetailsSettingFilter(SecurityContextUtils securityContextUtils) {
        super(securityContextUtils);
    }

    @Override
    protected Object provideAuthenticationDetails(Authentication authentication) {
        return securityContextUtils.getAuthenticationDetails(authentication);
    }

}