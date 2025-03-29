package com.example.cool_library.controller;

import com.example.cool_library.entity.Course;
import com.example.cool_library.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Course> getCoursesByCategory(@PathVariable String category) {
        return courseRepository.findByCategory(category);
    }

    @GetMapping("/level/{level}")
    public List<Course> getCoursesByLevel(@PathVariable String level) {
        return courseRepository.findByLevel(level);
    }

    @GetMapping("/search")
    public List<Course> searchCourses(@RequestParam String title) {
        return courseRepository.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course savedCourse = courseRepository.save(course);
            return ResponseEntity.ok(savedCourse);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to create course");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        try {
            return courseRepository.findById(id)
                    .map(course -> {
                        course.setTitle(courseDetails.getTitle());
                        course.setDescription(courseDetails.getDescription());
                        course.setPrice(courseDetails.getPrice());
                        course.setInstructorId(courseDetails.getInstructorId());
                        course.setImageUrl(courseDetails.getImageUrl());
                        course.setDuration(courseDetails.getDuration());
                        course.setLevel(courseDetails.getLevel());
                        course.setCategory(courseDetails.getCategory());
                        return ResponseEntity.ok(courseRepository.save(course));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to update course");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        try {
            return courseRepository.findById(id)
                    .map(course -> {
                        courseRepository.delete(course);
                        return ResponseEntity.ok().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to delete course");
            return ResponseEntity.internalServerError().body(response);
        }
    }
} 