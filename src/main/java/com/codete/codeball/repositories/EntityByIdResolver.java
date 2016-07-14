package com.codete.codeball.repositories;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;

import javax.persistence.EntityManager;

public class EntityByIdResolver implements ObjectIdResolver {

    private EntityManager entityManager;

    public EntityByIdResolver(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void bindItem(ObjectIdGenerator.IdKey id, Object pojo) {
    }

    @Override
    public Object resolveId(ObjectIdGenerator.IdKey id) {
        return entityManager.find(id.scope, id.key);
    }

    @Override
    public ObjectIdResolver newForDeserialization(Object context) {
        return this;
    }

    @Override
    public boolean canUseFor(ObjectIdResolver resolverType) {
        return false;
    }

}
