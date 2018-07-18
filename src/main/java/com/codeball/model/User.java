package com.codeball.model;

import com.codeball.exceptions.ArgumentNotPresentException;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import org.springframework.data.annotation.Transient;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Getter
@Entity(name = "app_user")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class User {

    @Id
    @Setter
    @Getter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Long id;

    @Email
    @Column(unique = true, nullable = false)
    @JsonProperty("email")
    private String email;

    @NotBlank
    @JsonProperty("firstName")
    private String firstName;

    @NotBlank
    @JsonProperty("lastName")
    private String lastName;

    @Getter(AccessLevel.NONE)
    @JsonProperty("pictureUrl")
    private String avatarUrl;

    @NotNull
    @Setter
    @JsonProperty("role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_USER;

    private User(String email, String firstName, String lastName, UserRole userRole) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = userRole;
    }

    private User(String email, String firstName, String lastName, UserRole userRole, String avatarUrl) {
        this(email, firstName, lastName, userRole);
        this.avatarUrl = avatarUrl;
    }

    public static User newAdmin(String email, String firstName, String lastName) {
        return new User(email, firstName, lastName, UserRole.ROLE_ADMIN);
    }

    public static User newNormalUser(String email, String firstName, String lastName, String avatarUrl) {
        return newUser(email, firstName, lastName, UserRole.ROLE_USER, avatarUrl);
    }

    public static User newUser(String email, String firstName, String lastName, UserRole role, String avatarUrl) {
        return new User(email, firstName, lastName, role, avatarUrl);
    }

    @Transient
    public Optional<Long> id() {
        return Optional.ofNullable(id);
    }

    public long takeId() {
        return id().orElseThrow(ArgumentNotPresentException::new);
    }

    public Optional<String> getAvatarUrl() {
        return Optional.ofNullable(avatarUrl);
    }

    @Override
    public String toString() {
        return String.valueOf(id);
    }

    public boolean hasRoleUser() {
        return role == UserRole.ROLE_USER;
    }

    public boolean hasRoleAdmin() {
        return role == UserRole.ROLE_ADMIN;
    }

}
