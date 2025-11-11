
import React from 'react';

interface InputGroupProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    type?: string;
    isTextArea?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({ id, label, value, onChange, placeholder, type = 'text', isTextArea = false }) => {
    const commonProps = {
        id: id,
        value: value,
        onChange: onChange,
        placeholder: placeholder,
        className: "block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200 px-3 py-2",
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
                {label}
            </label>
            {isTextArea ? (
                <textarea {...commonProps} rows={3} />
            ) : (
                <input type={type} {...commonProps} />
            )}
        </div>
    );
};

export default InputGroup;
