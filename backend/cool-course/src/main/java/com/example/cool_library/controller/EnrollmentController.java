package com.example.cool_library.controller;

import com.example.cool_library.entity.Enrollment;
import com.example.cool_library.dao.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Long id) {
        return enrollmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createEnrollment(@RequestBody Enrollment enrollment) {
        if (enrollmentRepository.existsByStudentIdAndCourseId(
                enrollment.getStudentId(), enrollment.getCourseId())) {
            return ResponseEntity.badRequest().body("Student is already enrolled in this course");
        }
        return ResponseEntity.ok(enrollmentRepository.save(enrollment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> updateEnrollment(@PathVariable Long id, @RequestBody Enrollment enrollmentDetails) {
        return enrollmentRepository.findById(id)
                .map(enrollment -> {
                    enrollment.setStatus(enrollmentDetails.getStatus());
                    enrollment.setProgressPercentage(enrollmentDetails.getProgressPercentage());
                    return ResponseEntity.ok(enrollmentRepository.save(enrollment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        return enrollmentRepository.findById(id)
                .map(enrollment -> {
                    enrollmentRepository.delete(enrollment);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollmentsByStudent(@PathVariable Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
} 