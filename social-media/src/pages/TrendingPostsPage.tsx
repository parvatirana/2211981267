import { useSocialMediaData } from '../hooks/useSocialMediaData';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TrendingPostsPage = () => {
  const { 
    trendingPosts, 
    users, 
    postCommentCounts, 
    loading, 
    error, 
    refreshData 
  } = useSocialMediaData();

  if (loading && trendingPosts.length === 0) {
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
        <h2 className="text-2xl font-bold text-gray-800">Trending Posts</h2>
        <button 
          onClick={() => refreshData()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Refresh Data
        </button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <p className="text-gray-600">
          Showing posts with the highest number of comments. These are the most engaged content on the platform right now.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendingPosts.length > 0 ? (
          trendingPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              user={findUser(post.userid)}
              commentCount={postCommentCounts[post.id] || 0}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 col-span-2">
            No trending posts available. Please refresh to try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPostsPage; 