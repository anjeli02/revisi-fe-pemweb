interface TextAreaProps {
    label: string;
    nama: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, nama, register, error, placeholder }) => {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <label htmlFor={label}>{label}</label>
            <textarea 
                {...register(nama)}
                placeholder={placeholder}
                className={`border-2 p-2.5 rounded-xl outline-none
                ${error 
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300" 
                    : "border-stone-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                }`}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
};

export default TextArea;