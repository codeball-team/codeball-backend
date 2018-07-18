package com.codeball.repositories;

import com.codeball.exceptions.UserNotFoundException;
import com.codeball.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Long countByLastName(@Param("lastName") String lastName);

    Optional<User> findByEmail(@Param("email") String email);

    default User getById(long userId) {
        return findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
