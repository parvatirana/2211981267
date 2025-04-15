import { Post, User } from '../types';
import { getPostImage } from '../utils/imageUtils';

interface PostCardProps {
  post: Post;
  user?: User;
  commentCount: number;
}

const PostCard = ({ post, user, commentCount }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Post Image */}
      <img 
        src={getPostImage(post.id)} 
        alt="Post cover" 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        {/* Post Content */}
        <div className="text-lg mb-2">{post.content}</div>
        
        {/* Post Meta */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            {user && (
              <span className="font-medium text-gray-700">
                Posted by: {user.name}
              </span>
            )}
          </div>
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 