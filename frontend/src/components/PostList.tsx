import React from 'react';
import { Grid } from '@mui/material';
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
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
          <PostCard
            post={post}
            onLikePost={onLikePost}
            onAddComment={onAddComment}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
