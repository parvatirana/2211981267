import { User, Post, Comment } from '../types';

// Mock data for development since the real API is not accessible
const mockUsers: Record<string, string> = {
  "1": "John Doe",
  "2": "Jane Doe",
  "3": "Alice Smith",
  "4": "Bob Johnson",
  "5": "Charlie Brown",
  "6": "Diana White",
  "7": "Edward Davis",
  "8": "Fiona Miller",
  "9": "George Wilson",
  "10": "Helen Moore"
};

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Try to fetch from the API first
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users from API');
      }
      
      const data = await response.json();
      return data.users || [];
    } catch (apiError) {
      console.warn('Using mock data due to API error:', apiError);
      
      // Fall back to mock data if API fails
      return Object.entries(mockUsers).map(([id, name]) => ({
        id,
        name
      }));
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Mock posts data
const generateMockPosts = (userId: string): Post[] => {
  const topics = ['cat', 'dog', 'travel', 'food', 'technology', 'music', 'art', 'books'];
  const posts: Post[] = [];
  
  // Generate 3-7 posts per user
  const postCount = 3 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < postCount; i++) {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomId = Math.floor(Math.random() * 1000);
    
    posts.push({
      id: randomId,
      userid: userId,
      content: `Post about ${randomTopic}`
    });
  }
  
  return posts;
};

// Fetch posts for a specific user
export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    // Try to fetch from the API first
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts for user ${userId}`);
      }
      
      const data = await response.json();
      return data.posts || [];
    } catch (apiError) {
      console.warn(`Using mock posts for user ${userId} due to API error:`, apiError);
      
      // Fall back to mock data if API fails
      return generateMockPosts(userId);
    }
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};

// Generate mock comments
const generateMockComments = (postId: number): Comment[] => {
  const commentContents = [
    'Great post!', 
    'I disagree.', 
    'Interesting perspective.', 
    'Thanks for sharing.',
    'Could you elaborate more?',
    'This is amazing!',
    'I had a similar experience.'
  ];
  
  const comments: Comment[] = [];
  
  // Generate 0-10 comments per post
  const commentCount = Math.floor(Math.random() * 11);
  
  for (let i = 0; i < commentCount; i++) {
    const randomContent = commentContents[Math.floor(Math.random() * commentContents.length)];
    const randomId = Math.floor(Math.random() * 10000);
    
    comments.push({
      id: randomId,
      postid: postId,
      content: randomContent
    });
  }
  
  return comments;
};

// Fetch comments for a specific post
export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    // Try to fetch from the API first
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post ${postId}`);
      }
      
      const data = await response.json();
      return data.comments || [];
    } catch (apiError) {
      console.warn(`Using mock comments for post ${postId} due to API error:`, apiError);
      
      // Fall back to mock data if API fails
      return generateMockComments(postId);
    }
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}; 