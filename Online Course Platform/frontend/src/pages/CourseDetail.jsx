import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@heroicons/react/24/solid";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${id}`);
        setCourse(response.data);
        // Mock reviews - in a real app, you'd fetch these from your backend
        setReviews([
          { id: 1, user: "John D.", rating: 5, comment: "Excellent course!", date: "2023-05-15" },
          { id: 2, user: "Sarah M.", rating: 4, comment: "Very informative", date: "2023-04-22" },
        ]);
        setError(null);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error.response?.data?.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating > 0 && reviewText.trim()) {
      const newReview = {
        id: reviews.length + 1,
        user: "You",
        rating,
        comment: reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
      // In a real app, you would send this to your backend
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error || "The course you're looking for doesn't exist or has been removed."}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <Link
              to="/courses"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
): 0;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={course.imageUrl || "https://via.placeholder.com/600"} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-4">${course.price}</p>
            <p className="mt-4 text-gray-700">{course.description}</p>
            
            <div className="mt-6">
              <button 
                onClick={() => window.location.href = `http://localhost:8080/api/courses/${id}`}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold"
              >
                Enroll Now
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Category</h3>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-1">
                {course.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{review.user}</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          
          {/* Add Review Form */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="focus:outline-none"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                    >
                      <StarIcon
                        className={`h-6 w-6 ${
                          star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  id="review"
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;