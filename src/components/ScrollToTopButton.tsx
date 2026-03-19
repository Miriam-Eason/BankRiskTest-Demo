import { createPortal } from 'react-dom';

type ScrollToTopButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

function ScrollToTopButton({ isVisible, onClick }: ScrollToTopButtonProps) {
  if (!isVisible || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <button
      type="button"
      onClick={onClick}
      aria-label="返回顶部"
      className="bank-top-button animate-fade-in"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>,
    document.body,
  );
}

export default ScrollToTopButton;
