import API_BASE_URL from '../config/api';

export const courseService = {
    // Get all courses
    getAllCourses: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`);
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Get course by ID
    getCourseById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching course details:', error);
            throw error;
        }
    },

    // Search courses
    searchCourses: async (title) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/search?title=${encodeURIComponent(title)}`);
            if (!response.ok) {
                throw new Error('Failed to search courses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching courses:', error);
            throw error;
        }
    }
}; 