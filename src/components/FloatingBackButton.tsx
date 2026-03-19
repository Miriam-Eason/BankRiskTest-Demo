import { createPortal } from 'react-dom';

type FloatingBackButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

function FloatingBackButton({ isVisible, onClick }: FloatingBackButtonProps) {
  if (!isVisible || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <button
      type="button"
      onClick={onClick}
      aria-label="返回主页"
      className="animate-fade-in fixed left-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--bank-navy)] text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#244a79]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>,
    document.body,
  );
}

export default FloatingBackButton;
