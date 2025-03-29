-- Create the database
CREATE DATABASE IF NOT EXISTS online_course_platform;
USE online_course_platform;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    instructor_id INT,
    level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    duration VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_enrollment (user_id, course_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_review (user_id, course_id)
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Programming', 'Learn various programming languages and frameworks'),
('Data Science', 'Master data analysis and machine learning'),
('Business', 'Business and management courses'),
('Design', 'UI/UX and graphic design courses');

-- Insert sample users (password is hashed in real application)
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@example.com', '$2a$10$example_hash', 'Admin User', 'admin'),
('instructor1', 'instructor1@example.com', '$2a$10$example_hash', 'John Doe', 'instructor'),
('student1', 'student1@example.com', '$2a$10$example_hash', 'Jane Smith', 'student');

-- Insert sample courses
INSERT INTO courses (title, description, price, image_url, category_id, instructor_id, level, duration) VALUES
('Complete Web Development Bootcamp', 'Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.', 99.99, 'https://example.com/web-dev.jpg', 1, 2, 'beginner', '12 weeks'),
('Python for Data Science', 'Master Python for data analysis and visualization. Learn pandas, NumPy, and matplotlib.', 79.99, 'https://example.com/python-ds.jpg', 2, 2, 'intermediate', '8 weeks'),
('UI/UX Design Fundamentals', 'Learn the basics of user interface design. Master design principles and popular tools.', 69.99, 'https://example.com/ui-ux.jpg', 4, 2, 'beginner', '6 weeks');

-- Insert sample enrollments
INSERT INTO enrollments (user_id, course_id, status) VALUES
(3, 1, 'active'),
(3, 2, 'active');

-- Insert sample reviews
INSERT INTO reviews (user_id, course_id, rating, comment) VALUES
(3, 1, 5, 'Excellent course! Very comprehensive and well-structured.'),
(3, 2, 4, 'Great content, but could use more practical examples.'); 