package com.codete.codeball.config;

import com.codete.codeball.model.Game;
import com.codete.codeball.model.Pitch;
import com.codete.codeball.model.Rating;
import com.codete.codeball.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class SpringDataRestConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class, Pitch.class, Game.class, Rating.class);
    }

}
