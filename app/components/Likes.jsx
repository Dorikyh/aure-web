import React, { useState, useEffect } from 'react';

const KotoneLikesComponent = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch('https://api.kotone.tech/user/likes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        const data = await response.json();
        setLikes(data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="likes-container">
      {likes.map((like, index) => (
        <div key={index} className="like-item">
          <img src={like[4]} alt={`Like ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <p>Date: {like[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default KotoneLikesComponent;
