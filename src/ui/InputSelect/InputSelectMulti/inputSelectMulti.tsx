import React from 'react';
import Select, {GroupBase, Props} from 'react-select';
import './inputSelectMulti.scss';

const INPUTSELECTMULTI_CLASSPEFIX_BASE = 'InputSelectMulti_main';
const INPUTSELECTMULTI_CLASSPEFIX_ERROR = 'InputSelectMulti_main_error';

interface CustomeSelectProps {
    children: React.ReactNode;
    label?: string;
    error?: boolean;
}

export default function InputSelectMulti<OptionType, GroupType extends GroupBase<OptionType> = GroupBase<OptionType>>({
    children,
    label,
    error,
    ...props
}: Omit<Props<OptionType, true, GroupType> & CustomeSelectProps, 'className' | 'classNamePrefix' | 'isMulti'>) {
    const calssNamePrefix = error ? INPUTSELECTMULTI_CLASSPEFIX_ERROR : INPUTSELECTMULTI_CLASSPEFIX_BASE;
    return (
        <div className="InputSelectMulti">
            <div className="InputSelectMulti__container">
                {label && <div className="InputSelectMulti__label">{label}</div>}
                <div className="InputSelectMulti__positionContainer">
                    <Select
                        isMulti
                        className="InputSelectMulti__main"
                        classNamePrefix={calssNamePrefix}
                        {...props}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}
