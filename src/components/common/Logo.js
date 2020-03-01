import React from 'react';
import { ReactComponent as StarWarsLogo } from '../../assets/icons/logo.svg';
import '../../styles/Logo/logo.css';

export const Logo = () => {
  return (
    <div className="logo-container">
      <StarWarsLogo className="logo" />
    </div>
  );
};
