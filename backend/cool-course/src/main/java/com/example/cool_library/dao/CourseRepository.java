package com.example.cool_library.dao;

import com.example.cool_library.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);
    List<Course> findByTitleContainingIgnoreCase(String title);
    List<Course> findByCategory(String category);
    List<Course> findByLevel(String level);
} 