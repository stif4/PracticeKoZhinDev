import React from 'react';
import './SlidePaper.scss';

interface ISlidePaperProps {
    children: React.ReactNode;
    isActive: boolean;
}

const SLIDE_PAPER_DEFULT = 'SlidePaper';
const SLIDE_PAPER_ACTIVE = 'SlidePaper SlidePaper_active';

export default function SlidePaper({children, isActive}: ISlidePaperProps) {
    const className = isActive ? SLIDE_PAPER_ACTIVE : SLIDE_PAPER_DEFULT;

    React.useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                document.body.classList.add('lock');
            }, 0.65 * 1000);
            return () => {
                document.body.classList.remove('lock');
            };
        }
        return undefined;
    }, [isActive]);

    return (
        <div className={className}>
            <div className="SlidePaper__container">{children}</div>
        </div>
    );
}
