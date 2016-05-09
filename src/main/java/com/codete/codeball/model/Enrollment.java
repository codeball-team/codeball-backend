package com.codete.codeball.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@Builder
@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Enrollment {

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private User user;
    private EnrollmentStatus enrollmentStatus;

    @Tolerate
    private Enrollment() {
    }

}
