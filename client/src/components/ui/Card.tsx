import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-lg font-semibold text-text">{title}</h2>
      {children}
    </div>
  );
}

export default Card;
