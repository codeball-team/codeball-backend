package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Data
@Builder
@Entity(name = "app_user")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
