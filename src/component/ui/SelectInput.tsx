interface SelectInputProps {
    label: string;
    nama: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: string;
    options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, nama, register, error, options }) => {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <label htmlFor={label}>{label}</label>
            <select 
                {...register(nama)}
                className={`border-2 p-2.5 rounded-xl outline-none
                ${error 
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300" 
                    : "border-stone-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                }`}
            >
                <option value="">Pilih</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SelectInput;