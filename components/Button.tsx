
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 select-none overflow-hidden relative group";
  
  const variants = {
    primary: "bg-pink-600 text-white hover:bg-pink-700 shadow-[0_10px_20px_#ff007f44] hover:shadow-[0_15px_30px_#ff007f66]",
    secondary: "bg-slate-900 text-white hover:bg-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]",
    outline: "border-4 border-pink-50 text-pink-600 hover:border-pink-500 bg-white shadow-xl",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 mr-3 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
    </button>
  );
};
