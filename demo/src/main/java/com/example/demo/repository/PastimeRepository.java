package com.example.demo.repository;

import com.example.demo.model.Pastime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PastimeRepository extends JpaRepository<Pastime, Long> {

}
