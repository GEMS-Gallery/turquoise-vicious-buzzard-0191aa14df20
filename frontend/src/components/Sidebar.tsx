import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SportsIcon from '@mui/icons-material/Sports';

interface SidebarProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const categories = [
  { name: null, icon: <ImageIcon />, label: 'All' },
  { name: 'Travel', icon: <LandscapeIcon />, label: 'Travel' },
  { name: 'People', icon: <PeopleIcon />, label: 'People' },
  { name: 'Food', icon: <RestaurantIcon />, label: 'Food' },
  { name: 'Sports', icon: <SportsIcon />, label: 'Sports' },
];

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <List>
      {categories.map((category) => (
        <ListItem
          button
          key={category.label}
          selected={category.name === selectedCategory}
          onClick={() => onSelectCategory(category.name)}
        >
          <ListItemIcon>{category.icon}</ListItemIcon>
          <ListItemText primary={category.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
