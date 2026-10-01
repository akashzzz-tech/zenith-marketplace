import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={cn(
          "bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-accent/20 max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-accent hover:text-primary p-1 rounded-md"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold text-primary mb-1">{title}</h3>
        {description && <p className="text-sm text-accent mb-4">{description}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
