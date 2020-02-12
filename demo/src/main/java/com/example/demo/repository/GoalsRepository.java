package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Goal;

import java.sql.Date;
import java.util.List;

public interface GoalsRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByPersonIdAndWeek(Long id, Date date);

    List<Goal> findByPersonId(Long id);
}
