import React, { useState } from 'react';

interface CreatePostFormProps {
  onCreatePost: (title: string, imageUrl: string, category: string) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && imageUrl && category) {
      onCreatePost(title, imageUrl, category);
      setTitle('');
      setImageUrl('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        <option value="Travel">Travel</option>
        <option value="People">People</option>
        <option value="Food">Food</option>
        <option value="Sports">Sports</option>
      </select>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
