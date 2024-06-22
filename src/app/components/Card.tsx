export const Card = ({ className, children, ...rest }: CardProps) => {
  return (
    <div className={`${cardClasses} ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

const cardClasses = `grid md:gap-2 sm:gap-y-4 sm:gap-x-2 py-4 sm:px-2 md:px-3  min-h-32 bg-white
        border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}
