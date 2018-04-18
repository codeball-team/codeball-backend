package com.codeball.utils.development;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DevelopmentSecurityContextFilter implements Filter {

    private static final String SPRING_SECURITY_CONTEXT_ATTRIBUTE = "SPRING_SECURITY_CONTEXT";

    @Autowired
    private DevelopmentProperties developmentProperties;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        DevelopmentProperties.SecurityContext developmentSecurityContext = developmentProperties.getSecurityContext();
        if (developmentSecurityContext.isEnabled()) {
            SecurityContext springSecurityContext = SecurityContextHolder.getContext();
            springSecurityContext.setAuthentication(new DevelopmentOAuth2Authentication(developmentProperties));
            httpRequest.getSession(true).setAttribute(SPRING_SECURITY_CONTEXT_ATTRIBUTE, springSecurityContext);
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

}