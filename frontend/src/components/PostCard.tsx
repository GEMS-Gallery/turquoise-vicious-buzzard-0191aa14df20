import React, { useState } from 'react';

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

interface PostCardProps {
  post: Post;
  onLikePost: (postId: bigint) => void;
  onAddComment: (postId: bigint, text: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikePost, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleLike = () => {
    onLikePost(post.id);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src="/api/placeholder/32/32" alt="User Avatar" />
        <span className="username">{post.title}</span>
        {post.category && <span className="category-tag">{post.category}</span>}
      </div>
      <div className="post-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>
      <div className="post-actions">
        <button className="action-btn like-btn" onClick={handleLike}>
          <svg className="action-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
        <button className="action-btn">
          <svg className="action-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="none" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
        <span className="post-likes">{post.likes.toString()} likes</span>
      </div>
      <div className="post-caption">
        <strong>{post.title}</strong> {/* You might want to add a caption field to your Post type */}
      </div>
      <div className="comments">
        {post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>User</strong> {comment.text}
          </div>
        ))}
      </div>
      <form className="comment-form" onSubmit={handleAddComment}>
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="comment-submit">Post</button>
      </form>
    </div>
  );
};

export default PostCard;
