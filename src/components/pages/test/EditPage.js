import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    const isReloaded = performance.navigation.type === 1;
    if (isReloaded) {
      navigate(-1); 
    }

  }, [navigate]);

  return (
    <div>
      <h1>Edit Page</h1>
      <p>Editing item with ID: {id}</p>
    </div>
  );
};

export default EditPage;
