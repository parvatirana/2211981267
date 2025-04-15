import { useState, useEffect, useCallback } from 'react';
import { User, Post, Comment } from '../types';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';

export const useSocialMediaData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topUsers, setTopUsers] = useState<(User & { commentCount: number })[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [postCommentCounts, setPostCommentCounts] = useState<Record<number, number>>({});

  // Fetch all users
  const fetchAllUsers = useCallback(async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      return fetchedUsers;
    } catch (err) {
      setError('Failed to fetch users');
      return [];
    }
  }, []);

  // Fetch posts for all users
  const fetchAllPosts = useCallback(async (fetchedUsers: User[]) => {
    try {
      const allPostsPromises = fetchedUsers.map(user => fetchUserPosts(user.id));
      const postsArrays = await Promise.all(allPostsPromises);
      
      // Flatten the array of arrays into a single array of posts
      const posts = postsArrays.flat();
      setAllPosts(posts);
      return posts;
    } catch (err) {
      setError('Failed to fetch posts');
      return [];
    }
  }, []);

  // Fetch comments for all posts
  const fetchAllComments = useCallback(async (posts: Post[]) => {
    try {
      const commentCountsMap: Record<number, number> = {};
      const userPostsCommentCountMap: Record<string, number> = {};
      
      // Using Promise.all to fetch comments for all posts in parallel
      const commentsPromises = posts.map(async post => {
        const comments = await fetchPostComments(post.id);
        commentCountsMap[post.id] = comments.length;
        
        // Track number of comments for each user's posts
        userPostsCommentCountMap[post.userid] = 
          (userPostsCommentCountMap[post.userid] || 0) + comments.length;
          
        return { postId: post.id, comments };
      });
      
      await Promise.all(commentsPromises);
      setPostCommentCounts(commentCountsMap);
      
      // Calculate and set top users (users with most commented posts)
      const topUsersList = users
        .map(user => ({
          ...user,
          commentCount: userPostsCommentCountMap[user.id] || 0
        }))
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5);
      setTopUsers(topUsersList);
      
      // Calculate and set trending posts (posts with max comments)
      let maxComments = 0;
      const postsWithCommentCounts = posts.map(post => ({
        ...post,
        commentCount: commentCountsMap[post.id] || 0
      }));
      
      // Find the maximum comment count
      for (const post of postsWithCommentCounts) {
        if (post.commentCount > maxComments) {
          maxComments = post.commentCount;
        }
      }
      
      // Filter posts with the maximum comment count
      const trendingPostsList = postsWithCommentCounts
        .filter(post => post.commentCount === maxComments)
        .sort((a, b) => b.id - a.id); // Sort by latest post ID if multiple have same comment count
        
      setTrendingPosts(trendingPostsList);
      
    } catch (err) {
      setError('Failed to fetch comments');
    }
  }, [users]);

  // Initial data fetch
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUsers = await fetchAllUsers();
      const posts = await fetchAllPosts(fetchedUsers);
      await fetchAllComments(posts);
    } finally {
      setLoading(false);
    }
  }, [fetchAllUsers, fetchAllPosts, fetchAllComments]);

  // Poll for new data periodically (every 30 seconds)
  useEffect(() => {
    // Initial load
    loadInitialData();
    
    // Set up polling interval
    const interval = setInterval(() => {
      loadInitialData();
    }, 30000); // 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [loadInitialData]);

  // Return all the data and state needed by components
  return {
    users,
    allPosts,
    loading,
    error,
    topUsers,
    trendingPosts,
    postCommentCounts,
    refreshData: loadInitialData
  };
}; 