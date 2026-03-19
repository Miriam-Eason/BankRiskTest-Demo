import { useEffect, useState, type RefObject } from 'react';

function useFloatingBackButton(targetRef: RefObject<Element>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return isVisible;
}

export default useFloatingBackButton;
