import React from 'react';
import InputResult from '../../model/InputResult';

type Props = InputResult & {
    clearMessage: () => void;
};

const Alert: React.FC<Props> = ({ status, message, clearMessage }) => {
    const colorMap = {
        error: 'red',
        warning: 'orange',
        success: 'green'
    };

    const color = colorMap[status] || null;
    
    if (!color) return null;

    setTimeout(clearMessage, 5000);

    return (
        <label style={{ color }}>{message}</label>
    );
};

export default Alert;
