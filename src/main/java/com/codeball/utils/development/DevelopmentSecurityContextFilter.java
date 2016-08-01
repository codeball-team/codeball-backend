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
    public void doFilter(ServletRequest request, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        DevelopmentProperties.SecurityContext developmentSecurityContext = developmentProperties.getSecurityContext();
        if (developmentSecurityContext.isEnabled()) {
            DevelopmentAuthentication developmentAuthentication = new DevelopmentAuthentication(developmentProperties);

            SecurityContext springSecurityContext = SecurityContextHolder.getContext();
            springSecurityContext.setAuthentication(developmentAuthentication);
            ((HttpServletRequest) request).getSession(true).setAttribute(SPRING_SECURITY_CONTEXT_ATTRIBUTE, springSecurityContext);
        }

        chain.doFilter(request, res);
    }

    @Override
    public void destroy() {
    }

}