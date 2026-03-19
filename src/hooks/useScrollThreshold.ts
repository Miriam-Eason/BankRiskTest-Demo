import { useEffect, useState } from 'react';

function useScrollThreshold(threshold = 300) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsPastThreshold(window.scrollY > threshold);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [threshold]);

  return isPastThreshold;
}

export default useScrollThreshold;
