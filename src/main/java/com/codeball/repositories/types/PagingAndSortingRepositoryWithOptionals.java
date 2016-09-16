package com.codeball.repositories.types;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * Extension of {@link CrudRepositoryWithOptionals} to provide additional methods to retrieve entities using the pagination and
 * sorting abstraction.
 */
@NoRepositoryBean
public interface PagingAndSortingRepositoryWithOptionals<T, ID extends Serializable> extends CrudRepositoryWithOptionals<T, ID> {

    /**
     * Returns all entities sorted by the given options.
     *
     * @param sort sorting strategy
     * @return all entities sorted by the given options
     */
    Iterable<T> findAll(Sort sort);

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable pagination information
     * @return a page of entities
     */
    Page<T> findAll(Pageable pageable);

}