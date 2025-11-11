
import React from 'react';

interface InstructionStepProps {
    number: number;
    title: string;
    children: React.ReactNode;
}

export const InstructionStep: React.FC<InstructionStepProps> = ({ number, title, children }) => {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {number}
                </div>
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-semibold leading-6 text-white">{title}</h3>
                <div className="mt-2 text-gray-400 text-base">
                    {children}
                </div>
            </div>
        </div>
    );
};
