package com.codeball.utils.development;

import com.codeball.model.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Component
@ConfigurationProperties(prefix = "development")
public class DevelopmentProperties {

    private final DataInitializer dataInitializer = new DataInitializer();
    private final SecurityContext securityContext = new SecurityContext();
    private final User user = new User();

    @Getter
    @Setter
    public static class DataInitializer {
        private boolean enabled;
    }

    @Getter
    @Setter
    public static class SecurityContext {
        private boolean enabled;
    }

    @Getter
    @Setter
    public static class User {
        private String email;
        private String firstName;
        private String lastName;
        private String pictureUrl;
        private UserRole role;
    }

}