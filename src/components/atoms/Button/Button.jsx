import './Button.css';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const buttonClass = `
    button
    button--${variant}
    button--${size}
    ${disabled ? 'button--disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;