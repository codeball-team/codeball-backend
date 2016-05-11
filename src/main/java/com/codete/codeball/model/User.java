package com.codete.codeball.model;

import com.codete.codeball.utils.ContextUtils;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.security.Principal;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonTypeInfo(include= JsonTypeInfo.As.WRAPPER_OBJECT, use=JsonTypeInfo.Id.NAME)
public class User {

    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    private String firstName;
    private String lastName;
    private String pictureUrl;
    private String role = UserRole.ROLE_USER.name();

    @Tolerate
    private User() {
    }

    @Override
    public String toString() {
        return String.valueOf(id);
    }

}
