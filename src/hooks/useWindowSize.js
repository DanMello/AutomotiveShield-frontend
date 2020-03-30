import { useState, useEffect } from 'react';

export default function useWindowResize() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  function handleWindowSizeChange () {
    setScreenSize(window.innerWidth);
  };
  return screenSize;
};