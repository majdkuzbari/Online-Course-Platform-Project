package com.example.cool_library.config;

import com.example.cool_library.dao.CourseRepository;
import com.example.cool_library.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // Only initialize if the database is empty
        if (courseRepository.count() == 0) {
            // Create sample courses
            Course course1 = new Course();
            course1.setTitle("Complete Web Development Bootcamp");
            course1.setDescription("Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.");
            course1.setPrice(99.99);
            course1.setLevel("Beginner");
            course1.setDuration("12 weeks");
            course1.setImageUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60");
            course1.setCategory("Programming");
            course1.setInstructorId(1L);

            Course course2 = new Course();
            course2.setTitle("Python for Data Science");
            course2.setDescription("Master Python for data analysis and visualization. Learn pandas, NumPy, and matplotlib.");
            course2.setPrice(79.99);
            course2.setLevel("Intermediate");
            course2.setDuration("8 weeks");
            course2.setImageUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60");
            course2.setCategory("Data Science");
            course2.setInstructorId(2L);

            Course course3 = new Course();
            course3.setTitle("UI/UX Design Fundamentals");
            course3.setDescription("Learn the basics of user interface design. Master design principles and popular tools.");
            course3.setPrice(69.99);
            course3.setLevel("Beginner");
            course3.setDuration("6 weeks");
            course3.setImageUrl("https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVpJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60");
            course3.setCategory("Design");
            course3.setInstructorId(3L);

            Course course4 = new Course();
            course4.setTitle("Digital Marketing Mastery");
            course4.setDescription("Learn comprehensive digital marketing strategies including SEO, social media, and email marketing.");
            course4.setPrice(89.99);
            course4.setLevel("Intermediate");
            course4.setDuration("10 weeks");
            course4.setImageUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60");
            course4.setCategory("Business");
            course4.setInstructorId(4L);

            Course course5 = new Course();
            course5.setTitle("Machine Learning Engineering");
            course5.setDescription("Deep dive into machine learning algorithms, neural networks, and AI applications.");
            course5.setPrice(129.99);
            course5.setLevel("Advanced");
            course5.setDuration("14 weeks");
            course5.setImageUrl("https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
            course5.setCategory("Data Science");
            course5.setInstructorId(5L);

            Course course6 = new Course();
            course6.setTitle("Mobile App Development");
            course6.setDescription("Build iOS and Android apps using React Native. Create cross-platform mobile applications.");
            course6.setPrice(109.99);
            course6.setLevel("Intermediate");
            course6.setDuration("12 weeks");
            course6.setImageUrl("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
            course6.setCategory("Programming");
            course6.setInstructorId(6L);

            // Save all courses
            courseRepository.save(course1);
            courseRepository.save(course2);
            courseRepository.save(course3);
            courseRepository.save(course4);
            courseRepository.save(course5);
            courseRepository.save(course6);
        }
    }
} 