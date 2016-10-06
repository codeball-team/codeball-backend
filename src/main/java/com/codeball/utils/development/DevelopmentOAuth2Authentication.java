package com.codeball.utils.development;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;

public class DevelopmentOAuth2Authentication extends OAuth2Authentication {

    private static OAuth2Request mockRequest = new OAuth2Request(
            Maps.newHashMap(), StringUtils.EMPTY, Lists.newArrayList(), false, Sets.newHashSet(),
            Sets.newHashSet(), StringUtils.EMPTY, Sets.newHashSet(), Maps.newHashMap());

    public DevelopmentOAuth2Authentication(DevelopmentProperties developmentProperties) {
        super(mockRequest, new DevelopmentAuthentication(developmentProperties));
    }

}