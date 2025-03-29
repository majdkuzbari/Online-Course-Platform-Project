# Online Course Platform

A modern web application for an online learning platform built with React and Spring Boot. This platform allows users to browse courses, view course details, and enroll in courses.

## Features

- 🎓 Browse available courses
- 📚 View detailed course information
- ⭐ Course ratings and reviews
- 🔍 Search functionality
- 🎨 Modern and responsive UI
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios for API calls

### Backend
- Spring Boot
- RESTful API
- MySQL Database

## Project Structure

```
Online Course Platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main application component
│   └── package.json
│
└── backend/                 # Spring Boot backend application
    └── src/
        └── main/
            ├── java/       # Java source files
            └── resources/  # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java JDK (v11 or higher)
- MySQL
- Maven

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Configure your database connection in `application.properties`

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

## API Endpoints

- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course details by ID
- `POST /api/courses` - Create a new course
- `PUT /api/courses/{id}` - Update a course
- `DELETE /api/courses/{id}` - Delete a course

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/online-course-platform](https://github.com/yourusername/online-course-platform) 