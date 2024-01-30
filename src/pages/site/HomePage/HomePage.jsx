import React, { useEffect } from 'react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router';
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/overview');
  }, []);

  return (
    <>
      <h1>Главная</h1>
    </>
  );
};

export default HomePage;
