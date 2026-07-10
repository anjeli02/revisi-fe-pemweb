interface ButtonProps {
    tittle: string;
    type?: "button" | "submit";
    variant?: "primary" | "outline";
    className?: string;
    isLoading?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    tittle,
    type = "button",
    variant = "primary",
    className = "",
    isLoading = false,
    onClick,
}) => {
    const baseStyle =
        "px-7 py-3 rounded-full font-semibold transition-all duration-200 shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none";
    const variantStyle =
        variant === "primary"
            ? "bg-brand-500 text-white hover:bg-brand-600"
            : "border-2 border-brand-300 text-brand-600 bg-white hover:bg-brand-50 shadow-none";
    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${className}`}>
            {isLoading ? "Memproses..." : tittle}
        </button>
    );
};

export default Button;
