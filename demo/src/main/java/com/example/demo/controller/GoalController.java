package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.GoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/goal")
public class GoalController{
    @Autowired
    private GoalsRepository goalsRepository;

    @PostMapping("/add")
    public @ResponseBody Goal addNewGoal (@RequestParam Long personId, @RequestParam String name,
                                          @RequestParam Boolean status, @RequestParam Date week) {

        Goal g = new Goal();
        g.setPersonId(personId);
        g.setName(name);
        g.setStatus(status);
        g.setWeek(week);
        goalsRepository.save(g);
        return g;
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Goal> getAllGoals() {
        return goalsRepository.findAll();
    }

    @GetMapping("/person/{id}")
    public @ResponseBody List<Goal> getPersonEvents(@PathVariable("id") Person person) {
        return goalsRepository.findByPersonId(person.getId());
    }

    @GetMapping("/person/{id}/week")
    public @ResponseBody
    List<Goal> getPersonEventsInOneWeek(@PathVariable("id") Person person,
                                         @RequestParam Date date) {
        LocalDate date1 = date.toLocalDate();
        date1.plusDays(2);
        Date newDate = Date.valueOf(date1);
        return goalsRepository.findByPersonIdAndWeek(person.getId(), date);
    }

    @PutMapping("/{id}/update/status")
    public @ResponseBody Goal updateGoal(@PathVariable("id") Goal goal) {
        goal.setStatus(!goal.getStatus());
        goalsRepository.save(goal);
        return goal;
    }
}