import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
    if (tokenFromUrl) {
      // Si hay un token en la URL, lo guardamos en el almacenamiento local
      localStorage.setItem('jwtToken', tokenFromUrl);
      setJwtToken(tokenFromUrl);
    } else {
      // Si no hay token en la URL, intentamos obtenerlo del almacenamiento local
      const tokenFromLocalStorage = localStorage.getItem('jwtToken');
      if (tokenFromLocalStorage) {
        setJwtToken(tokenFromLocalStorage);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://api.kotone.tech/user/info', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        setUserInfo(response.data);
        console.log(jwtToken);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    if (jwtToken) {
      fetchUserInfo();
    }
  }, [jwtToken]);

  return (
    <div>
      {userInfo && (
        <div>
          <h2>Welcome {userInfo.username}!</h2>
          <p>Credits: {userInfo.credits}</p>
        </div>
      )}
    </div>
  );
};

export default Login;