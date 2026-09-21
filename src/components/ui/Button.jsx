import React from "react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-card",
  outline:
    "bg-white text-primary-dark border border-border hover:border-primary hover:bg-primary/5",
  dark: "bg-primary-dark text-white hover:bg-[#0e1f18]",
  ghost: "bg-transparent text-primary-dark hover:bg-primary/5",
  call: "bg-white text-[#142c23] hover:bg-white/90 shadow-soft hover:shadow-card",
};

/**
 * Shared button used for every CTA across the site. `as="a"` renders an
 * anchor (for WhatsApp/tel/mailto/section links); otherwise a <button>.
 */
const Button = ({
  as = "button",
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}) => {
  const Tag = as;
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold
        transition-all duration-300 ease-out active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </Tag>
  );
};

export default Button;
