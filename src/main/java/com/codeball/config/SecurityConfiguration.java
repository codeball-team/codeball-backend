package com.codeball.config;

import com.codeball.utils.SecurityContextUtils;
import com.codeball.config.filter.UserSecurityContextFilter;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // for H2 Console usage, remove after first development phase
        http
                .csrf().disable()
                .headers().frameOptions().disable();

        http
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/login", "/webjars/**").permitAll()
                .antMatchers("/management/**").permitAll()
                .antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().authenticated();

        http.addFilterAfter(new UserSecurityContextFilter(securityContextUtils), SecurityContextPersistenceFilter.class);
    }

}
