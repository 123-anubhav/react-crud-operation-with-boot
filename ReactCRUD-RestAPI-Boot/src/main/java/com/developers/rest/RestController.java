package com.developers.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.developers.model.Student;
import com.developers.repo.StudentRepo;

@CrossOrigin(origins = "http://localhost:3000") // Specify the exact origin of your React app
@org.springframework.web.bind.annotation.RestController
public class RestController {

	@Autowired
	private StudentRepo stuRepo;

	@GetMapping("/get-Student")
	public List<Student> getStudent() {
		List<Student> all = stuRepo.findAll();
		return all;
	}

	@GetMapping("/get-Student/{id}")
	public Student getStudent(@PathVariable("id") int id) {
		Optional<Student> FetchById = stuRepo.findById(id);
		if (FetchById.isPresent()) {
			return FetchById.get();
		}
		return null;
	}
	
	@GetMapping("/get-Student-by-id")
	public Student getStudentQueryParam(@RequestParam("queryParamId") int id) {
		Optional<Student> FetchById = stuRepo.findById(id);
		if (FetchById.isPresent()) {
			return FetchById.get();
		}
		return null;
	}
	

	@PostMapping("/create-Student")
	public String Student(@RequestBody Student student) {
		Student save = stuRepo.save(student);
		return "record saved to db";

	}

	@PutMapping("/update-Student")
	public String editStudent(@RequestBody Student student) throws Exception {
		// Check if the record exists
		if (!stuRepo.existsById(student.getId())) {
			throw new Exception("Student with id " + student.getId() + " does not exist");
		}
		// Save the updated record
		Student updatedStudent = stuRepo.save(student);
		return "Record updated in DB with id: " + updatedStudent.getId();
	}

	@DeleteMapping("/delete-Student")
	public List<Student> deleteStudent(@RequestParam("id") Integer id) {
		stuRepo.deleteById(id);
		System.out.println("record deleted");
		return stuRepo.findAll();
	}

}
