import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface CreatePostFormProps {
  onCreatePost: (title: string, imageUrl: string, category: string | null) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost }) => {
  const { control, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { title: string; imageUrl: string; category: string | null }) => {
    setLoading(true);
    await onCreatePost(data.title, data.imageUrl, data.category);
    setLoading(false);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="imageUrl"
        control={control}
        defaultValue=""
        rules={{ required: 'Image URL is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="imageUrl"
            label="Image URL"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              {...field}
              labelId="category-label"
              id="category"
              label="Category"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="People">People</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Post'}
      </Button>
    </Box>
  );
};

export default CreatePostForm;
