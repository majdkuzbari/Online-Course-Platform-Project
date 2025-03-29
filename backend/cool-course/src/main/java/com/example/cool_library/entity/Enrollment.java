package com.example.cool_library.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "enrollments")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "enrollment_date")
    private LocalDateTime enrollmentDate;

    @Column(name = "completion_status")
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    @Column(name = "progress_percentage")
    private Integer progressPercentage;

    public enum EnrollmentStatus {
        IN_PROGRESS,
        COMPLETED,
        DROPPED
    }

    @PrePersist
    protected void onCreate() {
        enrollmentDate = LocalDateTime.now();
        if (status == null) {
            status = EnrollmentStatus.IN_PROGRESS;
        }
        if (progressPercentage == null) {
            progressPercentage = 0;
        }
    }
} 