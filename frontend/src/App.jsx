import React from 'react';
import ProfileViews from './components/ProfileViews';

const App = () => {
  const profileUrl = 'honey'; // Replace with the actual profile URL

  return (
    <div>
      <h1>LinkedIn-inspired Profile Views</h1>
      <ProfileViews profileUrl={profileUrl} />
    </div>
  );
};

export default App;