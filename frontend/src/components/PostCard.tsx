import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="user">U</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(Number(post.createdAt) / 1000000).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.category ? `Category: ${post.category}` : 'No category'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {post.likes.toString()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="h6">Comments</Typography>
        {post.comments.map((comment, index) => (
          <Typography key={index} variant="body2">
            {comment.text} - {new Date(Number(comment.createdAt) / 1000000).toLocaleString()}
          </Typography>
        ))}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
