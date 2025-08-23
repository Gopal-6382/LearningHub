const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  className = "",
  fullWidth = false,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  // Variant classes
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    warning:
      "bg-yellow-500 text-gray-900 hover:bg-yellow-600 focus:ring-yellow-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline:
      "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
  };

  // Size classes
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Width class
  const widthClass = fullWidth ? "w-full" : "";

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
