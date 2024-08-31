import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Grid, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';

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

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await backend.getPosts(selectedCategory);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleCreatePost = async (title: string, imageUrl: string, category: string | null) => {
    try {
      await backend.createPost(title, imageUrl, category);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId: bigint) => {
    try {
      await backend.likePost(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: bigint, text: string) => {
    try {
      await backend.addComment(postId, text);
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Container maxWidth="lg" className="mt-8">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          </Grid>
          <Grid item xs={12} md={9}>
            <CreatePostForm onCreatePost={handleCreatePost} />
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress />
              </div>
            ) : (
              <PostList
                posts={posts}
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
