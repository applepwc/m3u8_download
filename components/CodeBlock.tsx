
import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    const [copyText, setCopyText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyText('Failed');
            setTimeout(() => setCopyText('Copy'), 2000);
        });
    };

    return (
        <div className="bg-gray-900/70 rounded-md relative group">
            <pre className="p-4 text-sm text-yellow-300 overflow-x-auto font-mono">
                <code>{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-gray-200 bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
            >
                {copyText}
            </button>
        </div>
    );
};

export default CodeBlock;
