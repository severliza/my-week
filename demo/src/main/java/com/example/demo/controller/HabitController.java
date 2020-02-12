package com.example.demo.controller;

import com.example.demo.model.Habit;
import com.example.demo.model.Person;
import com.example.demo.repository.HabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/habit")
public class HabitController{
    @Autowired
    private HabitRepository habitRepository;

    @PostMapping("/add")
    public @ResponseBody String addNewHabit (@RequestParam Long personId, @RequestParam String name,
                        @RequestParam Date week, @RequestParam String color) {
        Habit h = new Habit();
        h.setPersonId(personId);
        h.setName(name);h.setWeek(week);
        h.setColor(color);

        habitRepository.save(h);
        return "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody
    List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @GetMapping("/person/{id}/week")
    public @ResponseBody
    List<Habit> getPersonHabitsInOneWeek(@PathVariable("id") Person person,
                                        @RequestParam Date date) {
        return habitRepository.findByPersonIdAndWeek(person.getId(), date);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHabit(@PathVariable("id") Habit habit) {
        // if( eventRepository.findById(event.getId()) == NULL){ return http://statuserror}
        habitRepository.deleteById(habit.getId());
    }
}