import React from 'react';
import zxcvbn from 'zxcvbn';
import {funcProgressColor} from '../../utils/ProgressBar';
import './ProgressBarPassword.scss';

export default function ProgressBarPassword({password}: {password: string}) {
    const testResult = zxcvbn(password);
    const num = (testResult.score * 100) / 4;

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(testResult),
        height: '100%',
        borderRadius: '4px',
        transition: 'all 1s ease-out',
    });

    return (
        <>
            <div className="Progress">
                <div style={changePasswordColor()} />
            </div>
        </>
    );
}
