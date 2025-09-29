import './Input.css';

function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  error,
  ...props
}) {
  const inputClass = `
    input
    ${error ? 'input--error' : ''}
    ${disabled ? 'input--disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClass}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}

export default Input;