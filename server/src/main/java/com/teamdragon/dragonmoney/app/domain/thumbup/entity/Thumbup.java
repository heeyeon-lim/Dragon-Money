package com.teamdragon.dragonmoney.app.domain.thumbup.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Thumbup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
