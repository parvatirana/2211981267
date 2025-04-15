export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: number;
  userid: string;
  content: string;
  commentCount?: number; // For tracking comment counts
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
} 