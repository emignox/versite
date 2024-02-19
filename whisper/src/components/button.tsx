interface ButtonProps {
  value: string;
  className: string;
}

function Button({ value, className }: ButtonProps) {
  return (
    <button value={value} className={className} type="submit">
      {value}
    </button>
  );
}

export default Button;
