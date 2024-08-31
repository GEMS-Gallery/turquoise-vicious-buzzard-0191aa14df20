import React from 'react';
import PostCard from './PostCard';

interface Post {
  id: bigint;
  title: string;
  imageUrl: string;
  category: string | null;
  likes: bigint;
  comments: Comment[];
  createdAt: bigint;
}

interface Comment {
  text: string;
  createdAt: bigint;
}

interface PostListProps {
  posts: Post[];
  onLikePost: (postId: bigint) => void;
  onAddComment: (postId: bigint, text: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onLikePost, onAddComment }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id.toString()}
          post={post}
          onLikePost={onLikePost}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default PostList;
