package com.example.demo.controller;
import com.example.demo.model.*;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

@RestController
@RequestMapping("/event")
public class EventController{
    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/add")
    public @ResponseBody Event addNewEvent (@RequestParam Long personId, @RequestParam String name,
                                             @RequestParam String start, @RequestParam String end, @RequestParam Date week,
                                             @RequestParam Integer dayOfTheWeek) {
        Event e = new Event();
        e.setPersonId(personId);
        e.setName(name);
        e.setStart(start);
        e.setEnd(end);
        e.setWeek(week);
        e.setDayOfTheWeek(dayOfTheWeek);
        eventRepository.save(e);
        return e;
    }

    @GetMapping("/all")
    public @ResponseBody List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Event getEvent(@PathVariable("id") Event event) {
        return event;
    }

    @GetMapping("/person/{id}")
    public @ResponseBody List<Event> getPersonEvents(@PathVariable("id") Person person) {
        return eventRepository.findByPersonId(person.getId());
    }

//*************************************
    @GetMapping("/person/{id}/week")
    public @ResponseBody List<Event> getPersonEventsInOneWeek(@PathVariable("id") Person person,
                                                              @RequestParam Date date) {
       return eventRepository.findByPersonIdAndWeek(person.getId(), date);
    }

    @GetMapping("/person/{id}/name")
    public @ResponseBody List<Event> getPersonEventsByName(@PathVariable("id") Person person,
                                                              @RequestParam String name) {
       return eventRepository.findByPersonIdAndName(person.getId(), name);
    }
    @GetMapping("/person/{id}/start")
    public @ResponseBody List<Event> getPersonEventsByStart(@PathVariable("id") Person person,
                                                              @RequestParam String start) {
        return eventRepository.findByPersonIdAndStart(person.getId(), start);
    }


    @PutMapping("/{id}/update/name")
    public @ResponseBody Event updateEvent(@PathVariable("id") Event event, @RequestBody Event eventForUpdate) {
        event.setName(eventForUpdate.getName());
        return event;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEvent(@PathVariable("id") Event event) {
        // if( eventRepository.findById(event.getId()) == NULL){ return http://statuserror}
        eventRepository.deleteById(event.getId());
    }
}