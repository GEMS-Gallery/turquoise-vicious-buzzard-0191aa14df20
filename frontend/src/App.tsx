import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';

interface Post {
  id: bigint;
  title: string;
  imageUrl: string;
  category: string;
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

  const handleCreatePost = async (title: string, imageUrl: string, category: string) => {
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
    <div>
      <Header />
      <div className="container">
        <Sidebar onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <div className="feed">
          <CreatePostForm onCreatePost={handleCreatePost} />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <PostList
              posts={posts}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
