package com.codeball.config;

import com.codeball.config.filter.UserDetailsSettingFilter;
import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

@Configuration
@EnableOAuth2Sso
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true, proxyTargetClass = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static final String HAS_ADMIN_ROLE_EXPRESSION = "hasRole('ROLE_ADMIN')";
    private static final String PROPERTIES_DELIMITER = ",";

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Value("${codeball.security.permit-all-urls}")
    private String permitAllUrls;

    @Value("${codeball.security.admin-access-urls}")
    private String adminAccessUrls;

    private String[] getPermitAllUrls() {
        return permitAllUrls.split(PROPERTIES_DELIMITER);
    }

    private String[] getAdminAccessUrls() {
        return adminAccessUrls.split(PROPERTIES_DELIMITER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers(getPermitAllUrls()).permitAll()
                .antMatchers(getAdminAccessUrls()).access(HAS_ADMIN_ROLE_EXPRESSION)
                .anyRequest().authenticated();

        http.csrf().disable();

        http.addFilterAfter(new UserDetailsSettingFilter(securityContextUtils), SecurityContextPersistenceFilter.class);
    }

}
