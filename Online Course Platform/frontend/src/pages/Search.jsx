import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

// Local course data
const localCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn modern web development with React, Node.js, and MongoDB. Build real-world projects.",
    instructor: "John Doe",
    price: 99.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Programming",
    level: "Beginner",
    duration: "12 weeks",
    featured: true
  },
  {
    id: 2,
    title: "Advanced Data Science and Machine Learning",
    description: "Master data science, machine learning, and AI with Python. Includes real-world projects.",
    instructor: "Jane Smith",
    price: 129.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Data Science",
    level: "Advanced",
    duration: "16 weeks",
    featured: true
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    description: "Complete guide to digital marketing including SEO, social media, and content marketing.",
    instructor: "Mike Johnson",
    price: 79.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Marketing",
    level: "Intermediate",
    duration: "8 weeks",
    featured: false
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native.",
    instructor: "Sarah Wilson",
    price: 89.99,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Programming",
    level: "Intermediate",
    duration: "10 weeks",
    featured: false
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    description: "Learn modern UI/UX design principles and tools like Figma and Adobe XD.",
    instructor: "Alex Brown",
    price: 69.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    featured: true
  }
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get('q');
    console.log('Current search query:', query);

    // Show all courses if no query
    if (!query || !query.trim()) {
      console.log('No query, showing all courses');
      setSearchResults(localCourses);
      setLoading(false);
      return;
    }

    // Perform search
    try {
      const searchTerm = query.toLowerCase().trim();
      console.log('Searching for:', searchTerm);

      const results = localCourses.filter(course => {
        const searchableText = [
          course.title,
          course.description,
          course.instructor,
          course.category,
          course.level
        ].join(' ').toLowerCase();

        const isMatch = searchableText.includes(searchTerm);
        console.log(`Course "${course.title}" matches: ${isMatch}`);
        return isMatch;
      });

      console.log(`Found ${results.length} results`);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Debug render
  console.log('Rendering Search component', {
    query: searchParams.get('q'),
    resultsCount: searchResults.length,
    loading
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {searchParams.get('q') 
          ? `Search Results for "${searchParams.get('q')}"` 
          : 'All Courses'}
      </h1>

      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && searchResults.length === 0 && (
        <div className="text-center py-8">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No courses found</h2>
          <p className="text-gray-500 mb-8">
            We couldn't find any courses matching "{searchParams.get('q')}". 
            Try different keywords or browse our available courses.
          </p>
          <Link 
            to="/courses" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <>
          <p className="text-gray-600 mb-6">
            Found {searchResults.length} course{searchResults.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search; 