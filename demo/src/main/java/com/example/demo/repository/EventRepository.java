package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAll();
    List<Event> findByPersonId(Long id);

    //@Query(value = "SELECT e FROM Event e WHERE e.week = :week and e.personId = :id")
    List<Event> findByPersonIdAndWeek(Long id, Date date);

    List<Event> findByPersonIdAndName(Long id, String name);

    List<Event> findByPersonIdAndStart(Long id, String start);
}
