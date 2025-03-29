import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { courseService } from '../services/courseService';

const sampleCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, and Node.js.",
    price: 99.99,
    level: "Beginner",
    duration: "12 weeks",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: { name: "Programming" }
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Master Python for data analysis and visualization. Learn pandas, NumPy, and matplotlib.",
    price: 79.99,
    level: "Intermediate",
    duration: "8 weeks",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: { name: "Data Science" }
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Learn the basics of user interface design. Master design principles and popular tools.",
    price: 69.99,
    level: "Beginner",
    duration: "6 weeks",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVpJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: { name: "Design" }
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    description: "Learn comprehensive digital marketing strategies including SEO, social media, and email marketing.",
    price: 89.99,
    level: "Intermediate",
    duration: "10 weeks",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    category: { name: "Business" }
  },
  {
    id: 5,
    title: "Machine Learning Engineering",
    description: "Deep dive into machine learning algorithms, neural networks, and AI applications.",
    price: 129.99,
    level: "Advanced",
    duration: "14 weeks",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: { name: "Data Science" }
  },
  {
    id: 6,
    title: "Mobile App Development",
    description: "Build iOS and Android apps using React Native. Create cross-platform mobile applications.",
    price: 109.99,
    level: "Intermediate",
    duration: "12 weeks",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: { name: "Programming" }
  }
];

const sampleCategories = [
  { id: 1, name: "Programming" },
  { id: 2, name: "Data Science" },
  { id: 3, name: "Business" },
  { id: 4, name: "Design" }
];

const Courses = () => {
  const [courses] = useState(sampleCourses);
  const [categories] = useState(sampleCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const searchParam = queryParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  // Filter courses based on search query and selected category
  const filteredCourses = courses.filter(course => {
    const searchString = [
      course.title,
      course.description,
      course.category.name,
      course.level
    ].join(' ').toLowerCase();

    const matchesSearch = !searchQuery || 
      searchString.includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      course.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Courses</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Courses"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-blue-600">${course.price}</span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{course.level}</span>
                <span className="text-sm text-gray-500">{course.category.name}</span>
              </div>
              <Link
                to={`/course/${course.id}`}
                className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;