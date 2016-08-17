package com.codeball.utils.development;

import com.codeball.utils.SecurityContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.*;
import java.io.IOException;
import java.util.Objects;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class UserRegistrationFilter implements Filter {

    @Autowired
    private SecurityContextUtils securityContextUtils;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    @Transactional
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if (Objects.nonNull(securityContext.getAuthentication())) {
            securityContextUtils.createUserIfNotExists(securityContext.getAuthentication());
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

}