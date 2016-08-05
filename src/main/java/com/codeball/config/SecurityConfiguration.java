package com.codeball.config;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableOAuth2Sso
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // for H2 Console usage, remove after first development phase
        http
                .csrf().disable()
                .headers().frameOptions().disable();

        http
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "*").permitAll()
                .antMatchers("/login", "/webjars/**").permitAll()
                .antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().authenticated();
    }

}
