import { useSocialMediaData } from '../hooks/useSocialMediaData';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TopUsersPage = () => {
  const { topUsers, loading, error, refreshData } = useSocialMediaData();

  if (loading && topUsers.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Top Users</h2>
        <button 
          onClick={() => refreshData()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Refresh Data
        </button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <p className="text-gray-600">
          Showing the top 5 users with the most commented posts. These users generate the most engagement on the platform.
        </p>
      </div>
      
      <div className="space-y-4">
        {topUsers.length > 0 ? (
          topUsers.map((user, index) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              commentCount={user.commentCount}
              rank={index + 1}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No user data available. Please refresh to try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsersPage; 