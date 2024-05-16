import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileViews = ({ profileUrl }) => {
  const [views, setViews] = useState([]);

  useEffect(() => {
    const fetchProfileViews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${profileUrl}/views`);
        setViews(response.data);
      } catch (error) {
        console.error('Error fetching profile views:', error);
      }
    };
  
    fetchProfileViews();
  }, [profileUrl]);

  return (
    <div>
      <h2>Profile Views</h2>
      {views.length === 0 ? (
        <p>No profile views yet.</p>
      ) : (
        <ul>
          {views?.map((view) => (
            <li key={view._id}>
              <a href={`/${view.user.profileUrl}`}>{view.user.name}</a> viewed your profile on{' '}
              {new Date(view.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileViews;