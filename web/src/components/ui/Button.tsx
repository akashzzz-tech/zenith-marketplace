import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({ className, variant = 'primary', size = 'md', loading, children, ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-primary hover:bg-secondary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "hover:bg-accent/10 text-primary",
    danger: "bg-error text-white hover:bg-error/90",
  };
  const sizes = { sm: "h-9 px-3 text-sm", md: "h-10 px-4 py-2", lg: "h-11 px-8 text-lg" };

  return (
    <button className={cn(baseStyle, variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
}\n