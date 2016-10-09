package com.codeball.utils.development;

import com.codeball.utils.AuthenticationExtractor;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.Collection;
import java.util.Map;

class DevelopmentAuthentication implements Authentication, Principal {

    private DevelopmentProperties.User developmentUserProperties;

    public DevelopmentAuthentication(DevelopmentProperties developmentProperties) {
        this.developmentUserProperties = developmentProperties.getUser();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Lists.newArrayList();
    }

    @Override
    public Object getCredentials() {
        return this;
    }

    @Override
    public Object getDetails() {
        Map<String, String> details = Maps.newHashMap();
        details.put(AuthenticationExtractor.AUTH_DETAILS_EMAIL, developmentUserProperties.getEmail());
        details.put(AuthenticationExtractor.AUTH_DETAILS_GIVEN_NAME, developmentUserProperties.getFirstName());
        details.put(AuthenticationExtractor.AUTH_DETAILS_FAMILY_NAME, developmentUserProperties.getLastName());
        details.put(AuthenticationExtractor.AUTH_DETAILS_PICTURE, developmentUserProperties.getPictureUrl());
        details.put(AuthenticationExtractor.AUTH_DETAILS_ROLE, developmentUserProperties.getRole().name());
        return details;
    }

    @Override
    public Object getPrincipal() {
        return this;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) {
        // dummy
    }

    @Override
    public String getName() {
        return developmentUserProperties.getEmail();
    }

}