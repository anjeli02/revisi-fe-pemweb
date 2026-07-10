import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)] rounded-3xl overflow-hidden border border-rose-50 p-6 transition-all ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
