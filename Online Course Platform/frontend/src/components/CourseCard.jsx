import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    description,
    instructor,
    price,
    rating,
    imageUrl,
    category,
    level,
    duration
  } = course;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/courses/${id}`}>
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {course.featured && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{category}</span>
            <span className="text-sm text-gray-500">{level}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">By {instructor}</span>
            <span className="text-lg font-bold text-blue-600">${price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;