
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Index Page</h1>
      {/* Your list of items */}
      <ul>
        <li>
          <span>Item 1</span>
          <button onClick={() => handleEditClick(1)}>Edit</button>
        </li>
        <li>
          <span>Item 2</span>
          <button onClick={() => handleEditClick(2)}>Edit</button>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default IndexPage;
