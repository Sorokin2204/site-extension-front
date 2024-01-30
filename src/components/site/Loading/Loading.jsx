import React from 'react';
import styles from './Loading.module.scss';
const Loading = ({ isWhite = false }) => {
  return (
    <>
      {' '}
      <div className="overlay" style={{ ...(isWhite && { background: '#fff' }) }}>
        <div class="loader-overlay">
          <div class="dm-spin-dots spin-lg">
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
