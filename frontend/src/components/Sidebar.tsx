import React from 'react';

interface SidebarProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory, selectedCategory }) => {
  const categories = [
    { name: null, icon: 'M3 3h18v18H3V3zm2 2v14h14V5H5z', label: 'All' },
    { name: 'Travel', icon: 'M21 3H3v18h18V3zm-2 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z', label: 'Travel' },
    { name: 'People', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', label: 'People' },
    { name: 'Food', icon: 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z', label: 'Food' },
    { name: 'Sports', icon: 'M14.5 1A4.5 4.5 0 0010 5.5V9H3v6h1.5v7h15v-7H21V9h-3V5.5A4.5 4.5 0 0014.5 1zm0 2c1.4 0 2.5 1.1 2.5 2.5V9h-5V5.5C12 4.1 13.1 3 14.5 3z', label: 'Sports' },
  ];

  return (
    <nav className="left-menu">
      {categories.map((category) => (
        <div
          key={category.label}
          className={`menu-item ${category.name === selectedCategory ? 'selected' : ''}`}
          onClick={() => onSelectCategory(category.name)}
        >
          <svg className="menu-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d={category.icon} fill="none" stroke="#000" strokeWidth="2" />
          </svg>
          {category.label}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
