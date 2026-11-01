interface ButtonProps {
  title: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

const Button = ({ title, disabled = false, variant = 'primary', onClick }: ButtonProps) => {
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'border border-border bg-surface text-text hover:bg-elevated',
    danger: ' bg-danger text-white hover:opacity-90',
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg px-5 py-2.5 font-medium transition ${variants[variant]} disabled:cursor-not-allowed display:opacity-50`}
    >
      {title}
    </button>
  );
};

export default Button;
