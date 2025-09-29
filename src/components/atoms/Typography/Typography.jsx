import './Typography.css';

function Typography({
  variant = 'body',
  children,
  className = '',
  color,
  align,
  as,
  ...props
}) {
  const Component = as || getDefaultElement(variant);

  const typographyClass = `
    typography
    typography--${variant}
    ${color ? `typography--${color}` : ''}
    ${align ? `typography--${align}` : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <Component className={typographyClass} {...props}>
      {children}
    </Component>
  );
}

function getDefaultElement(variant) {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle':
      return 'h2';
    case 'body':
      return 'p';
    case 'caption':
      return 'span';
    case 'overline':
      return 'span';
    default:
      return 'p';
  }
}

export default Typography;