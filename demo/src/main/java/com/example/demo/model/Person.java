package com.example.demo.model;

import javax.persistence.*;
import java.util.Set;

@Table(name = "person")
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String login;
    private String password;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "personId")
    private Set<Event> events;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "personId")
    private Set<Goal> goals;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "personId")
    private Set<Habit> habits;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "personId")
    private Set<Pastime> pastimes;

    public Set<Habit> getHabits() {
        return habits;
    }

    public void setHabits(Set<Habit> habits) {
        this.habits = habits;
    }

    public Set<Pastime> getPastimes() {
        return pastimes;
    }

    public void setPastimes(Set<Pastime> pastimes) {
        this.pastimes = pastimes;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<Goal> getGoals() {
        return goals;
    }

    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}