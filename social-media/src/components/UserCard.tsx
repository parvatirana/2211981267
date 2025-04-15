import { getUserAvatar } from '../utils/imageUtils';

interface UserCardProps {
  id: string;
  name: string;
  commentCount: number;
  rank: number;
}

const UserCard = ({ id, name, commentCount, rank }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <div className="text-2xl font-bold text-blue-600 w-10 text-center">
        #{rank}
      </div>
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={getUserAvatar(id)} 
          alt={`${name}'s avatar`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="text-gray-600">
          <span className="font-semibold">{commentCount}</span> 
          {commentCount === 1 ? ' comment' : ' comments'} on posts
        </p>
      </div>
    </div>
  );
};

export default UserCard; 