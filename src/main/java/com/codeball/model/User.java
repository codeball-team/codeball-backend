package com.codeball.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Builder
@Getter
@Entity(name = "app_user")
public class User {

    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;
    @Column(unique = true, nullable = false)
    @JsonProperty("email")
    private String email;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("pictureUrl")
    private String pictureUrl;
    @Setter
    @JsonProperty("role")
    private String role = UserRole.ROLE_USER.name();

    @Tolerate
    public User() {}

    @Override
    public String toString() {
        return String.valueOf(id);
    }

}
