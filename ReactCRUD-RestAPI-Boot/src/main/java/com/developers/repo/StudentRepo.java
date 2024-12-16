package com.developers.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.developers.model.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {

}
