package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Rating {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Game game;
    @ManyToOne
    private User voter;
    @ManyToOne
    private User player;

    @Tolerate
    private Rating() {
    }

}
