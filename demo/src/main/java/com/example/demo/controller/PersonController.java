package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/person")
public class PersonController{
    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/add")
    public @ResponseBody String addNewPerson (@RequestParam String login, @RequestParam String password) {

        Person p = new Person();
        p.setLogin(login);
        p.setPassword(password);
        personRepository.save(p);
        return "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @GetMapping("/login")
    public @ResponseBody Person getPersonByLogin(@RequestParam String login) {
        return personRepository.findByLogin(login);
    }

    @GetMapping("/login/password")
    public @ResponseBody Long getPersonByLoginAndPass(@RequestParam String login, @RequestParam String password) {
        Person p = personRepository.findByLoginAndPassword(login, password);
        return p.getId();
    }
}