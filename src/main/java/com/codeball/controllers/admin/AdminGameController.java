package com.codeball.controllers.admin;

import com.codeball.model.Game;
import com.codeball.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/admin/game", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AdminGameController {

    @Autowired
    private GameRepository gameRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Game> getGames() {
        return gameRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Game getGameById(@PathVariable long id) {
        return gameRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Game updateGame(@PathVariable long id, @RequestBody Game game) {
        game.setId(id);
        return gameRepository.save(game);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteGame(@PathVariable long id) {
        gameRepository.delete(id);
    }

}
