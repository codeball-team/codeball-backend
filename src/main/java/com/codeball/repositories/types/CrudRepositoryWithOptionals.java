package com.codeball.repositories.types;

import com.codeball.exceptions.ResourceNotFoundException;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;
import java.util.Optional;

/**
 * Interface for generic CRUD operations on a repository for a specific type returning non-null values (wrapped in Optionals if necessary).
 * Based on {@link org.springframework.data.repository.CrudRepository}.
 */
@NoRepositoryBean
public interface CrudRepositoryWithOptionals<T, ID extends Serializable> extends Repository<T, ID> {

    /**
     * Saves a given entity. Use the returned instance for further operations as the save operation might have changed the
     * entity instance completely.
     *
     * @param entity entity to be saved
     * @return the saved entity
     */
    <S extends T> S save(S entity);

    /**
     * Saves all given entities.
     *
     * @param entities list of entities to be saved
     * @return the saved entities
     */
    <S extends T> Iterable<S> save(Iterable<S> entities);

    /**
     * Retrieves an entity by its id.
     *
     * @param id ID of the requested entity
     * @return the entity with the given id or Optional.empty()
     */
    Optional<T> findOne(ID id);

    /**
     * Retrieves an entity by its id or throws ResourceNotFoundException if not found.
     *
     * @param id ID of the requested entity
     * @return the entity with the given id or Optional.empty()
     */
    default T getOne(ID id) {
        return findOne(id).orElseThrow(ResourceNotFoundException::new);
    }

    /**
     * Returns whether an entity with the given id exists.
     *
     * @param id ID of the requested entity
     * @return true if an entity with the given id exists, {@literal false} otherwise
     */
    boolean exists(ID id);

    /**
     * Returns all instances of the type.
     *
     * @return all entities
     */
    Iterable<T> findAll();

    /**
     * Returns all instances of the type with the given IDs.
     *
     * @param ids list of IDs of requested entities
     * @return found entities
     */
    Iterable<T> findAll(Iterable<ID> ids);

    /**
     * Returns the number of entities available.
     *
     * @return the number of entities
     */
    long count();

    /**
     * Deletes the entity with the given id.
     *
     * @param id ID of the requested entity
     */
    void delete(ID id);

    /**
     * Deletes a given entity.
     *
     * @param entity entity to be saved
     */
    void delete(T entity);

    /**
     * Deletes the given entities.
     *
     * @param entities list of entities to be saved
     */
    void delete(Iterable<? extends T> entities);

    /**
     * Deletes all entities managed by the repository.
     */
    void deleteAll();

}
