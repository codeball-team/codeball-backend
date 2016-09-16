package com.codeball.repositories;

import com.codeball.model.User;
import com.codeball.repositories.types.CrudRepositoryWithOptionals;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepositoryWithOptionals<User, Long> {

    Long countByLastName(@Param("lastName") String lastName);

    Optional<User> findByEmail(@Param("email") String email);

}
