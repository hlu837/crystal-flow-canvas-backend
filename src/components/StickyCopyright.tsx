import { useEffect, useState } from 'react';

const StickyCopyright = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the main footer element
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hide when footer is in view
      if (footerRect.top < windowHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 py-4 text-center pointer-events-none">
      <p className="text-muted-foreground/60 text-xs tracking-wide">
        © 2023 NINJASERVERS
      </p>
    </div>
  );
};

export default StickyCopyright;