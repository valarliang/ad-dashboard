import React from 'react';
import { Link } from "react-router-dom";

const FilterLink = ({ active, children, filter }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <Link to={filter === 'all' ? '' : filter} activestyle={{ textDecoration: 'none', color: 'black' }}>
      {children}
    </Link>
  );
};

export default FilterLink;
