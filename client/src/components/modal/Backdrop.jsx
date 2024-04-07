import React from 'react'

const Backdrop = ({ children, onClick }) => {
    return (
      <div className="Backdrop" onClick={onClick}>
        {children}
      </div>
    );
  };

export default Backdrop