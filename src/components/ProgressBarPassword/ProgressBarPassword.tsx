import React from 'react';
import zxcvbn from 'zxcvbn';
import './ProgressBarPassword.scss';

export default function ProgressBarPassword({password}: {password: string}) {
    const testResult = zxcvbn(password);
    const num = (testResult.score * 100) / 4;

    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#fb4e4e';
            case 2:
                return '#ffad00';
            case 3:
                return '#2bc945';
            case 4:
                return '#2bc945';
            default:
                return 'none';
        }
    };

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
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
