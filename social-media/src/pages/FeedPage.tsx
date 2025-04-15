import { useEffect, useState } from 'react';
import { useSocialMediaData } from '../hooks/useSocialMediaData';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Post } from '../types';

const FeedPage = () => {
  const { 
    allPosts, 
    users, 
    postCommentCounts, 
    loading, 
    error, 
    refreshData 
  } = useSocialMediaData();
  
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);

  // Sort posts by ID in descending order (assuming higher ID = newer post)
  useEffect(() => {
    if (allPosts.length > 0) {
      const sorted = [...allPosts].sort((a, b) => b.id - a.id);
      setSortedPosts(sorted);
    }
  }, [allPosts]);

  if (loading && sortedPosts.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Find user by user ID
  const findUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Feed</h2>
        <button 
          onClick={() => refreshData()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Refresh Feed
        </button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <p className="text-gray-600">
          Showing the latest posts from all users, with the newest posts displayed at the top.
        </p>
      </div>
      
      <div className="space-y-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              user={findUser(post.userid)}
              commentCount={postCommentCounts[post.id] || 0}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No posts available. Please refresh to try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage; 