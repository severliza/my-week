package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Habit;

import java.sql.Date;
import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findAll();

    List<Habit> findByPersonIdAndWeek(Long id, Date date);
}
