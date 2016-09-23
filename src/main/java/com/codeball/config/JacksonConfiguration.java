package com.codeball.config;

import com.codeball.repositories.resolvers.EntityByIdResolver;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.ObjectIdResolver;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.MapperConfig;
import com.fasterxml.jackson.databind.introspect.Annotated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.json.SpringHandlerInstantiator;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Configuration
public class JacksonConfiguration extends WebMvcConfigurerAdapter {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void configureMessageConverters(final List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper configuredObjectMapper = createAndConfigureObjectMapper();
        messageConverter.setObjectMapper(configuredObjectMapper);
        converters.add(messageConverter);
        super.configureMessageConverters(converters);
    }

    private ObjectMapper createAndConfigureObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        configureEntityManagerAutoInjectionForObjectIdResolvers(objectMapper);
        configureDeserializationFeatures(objectMapper);
        configureDefaultObjectMapperBehaviour(objectMapper);
        return objectMapper;
    }

    private void configureDefaultObjectMapperBehaviour(ObjectMapper objectMapper) {
        objectMapper.setVisibility(PropertyAccessor.CREATOR, JsonAutoDetect.Visibility.ANY);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.NONE);
        objectMapper.setVisibility(PropertyAccessor.SETTER, JsonAutoDetect.Visibility.NONE);
        objectMapper.setVisibility(PropertyAccessor.GETTER, JsonAutoDetect.Visibility.NONE);
        objectMapper.setVisibility(PropertyAccessor.IS_GETTER, JsonAutoDetect.Visibility.NONE);
    }

    private void configureDeserializationFeatures(ObjectMapper objectMapper) {
        objectMapper.configure(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_NULL_CREATOR_PROPERTIES, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNRESOLVED_OBJECT_IDS, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNRESOLVED_OBJECT_IDS, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    private void configureEntityManagerAutoInjectionForObjectIdResolvers(ObjectMapper objectMapper) {
        objectMapper.setHandlerInstantiator(new SpringHandlerInstantiator(this.applicationContext.getAutowireCapableBeanFactory()) {
            @Override
            public ObjectIdResolver resolverIdGeneratorInstance(
                    final MapperConfig<?> config,
                    final Annotated annotated,
                    final Class<?> implClass) {

                if (implClass == EntityByIdResolver.class) {
                    return new EntityByIdResolver(entityManager);
                }

                return null;
            }
        });
    }


}
