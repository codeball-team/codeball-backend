package com.codete.codeball.repositories;

import com.codete.codeball.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    Long countByLastName(@Param("lastName") String lastName);

}
