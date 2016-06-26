package com.codete.codeball.controllers.admin;

import com.codete.codeball.model.Game;
import com.codete.codeball.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/admin/game")
public class AdminGameController {

    @Autowired
    private GameRepository gameRepository;

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll();
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    public Game updateGame(@PathVariable long id, @RequestBody Game game) {
        game.setId(id);
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    public void deleteGame(@PathVariable long id) {
        gameRepository.delete(id);
    }

}
