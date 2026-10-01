import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, helperText, ...props }, ref) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block text-sm font-medium text-primary mb-1">{label}</label>}
      <input
        ref={ref}
        className={cn("flex h-10 w-full rounded-md border border-accent/30 bg-white px-3 py-2 text-sm placeholder:text-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-accent">{helperText}</p>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;\n