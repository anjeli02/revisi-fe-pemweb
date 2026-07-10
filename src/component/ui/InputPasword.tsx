import { useState } from "react";

interface InputPasswordProps {
    label: string;
    nama: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ label, nama, register, error }) => {
        const [show, setShow] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-1 mb-2">
            <label htmlFor={label}>{label}</label>

            <div className="relative">
                <input 
                    type={show ? "text" : "password"}  
                    {...register(nama)} 
                    placeholder={label} 
                    className={`w-full border-2 p-2.5 rounded-xl outline-none pr-14
                    ${error 
                        ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300" 
                        : "border-stone-200 focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                    }`}
                />

                <button type="button" 
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-2 text-sm"
                    >
                    {show ? "Hide" : "Show"}
                </button>
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
};

export default InputPassword;