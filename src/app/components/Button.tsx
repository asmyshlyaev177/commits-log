export const Button = ({
  disabled,
  onClick,
  children,
  type,
  variant = 'default',
}: {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: Variant;
}) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

type Variant = keyof typeof variantStyles;

const baseStyles = `focus:ring-4
        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none
        disabled:opacity-50`;

const variantStyles = {
  default: `bg-slate-300 hover:bg-slate-400 hover:text-white text-black
   dark:text-white dark:bg-slate-500 dark:hover:bg-slate-300`,
  blue: `text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600
        dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800`,
};
