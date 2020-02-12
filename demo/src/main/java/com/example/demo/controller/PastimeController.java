package com.example.demo.controller;

import com.example.demo.model.Pastime;
import com.example.demo.repository.PastimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/pastime")
public class PastimeController{
    @Autowired
    private PastimeRepository pastimeRepository;

    @PostMapping("/add")
    public @ResponseBody
    String addNewPastime (@RequestParam Long personId, @RequestParam String name, @RequestParam String color) {

        Pastime p = new Pastime();
        p.setPersonId(personId);
        p.setColor(color);
        p.setName(name);
        pastimeRepository.save(p);
        return "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Pastime> getAllGoals() {
        return pastimeRepository.findAll();
    }
}