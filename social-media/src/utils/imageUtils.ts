// Generate a random avatar for users
export const getUserAvatar = (userId: string): string => {
  // Using DiceBear API for random avatars
  return `https://api.dicebear.com/7.x/personas/svg?seed=${userId}`;
};

// Generate a random image for posts
export const getPostImage = (postId: number): string => {
  // Using Picsum Photos for random post images
  return `https://picsum.photos/seed/${postId}/400/300`;
}; 