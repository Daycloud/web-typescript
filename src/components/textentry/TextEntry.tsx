import * as React from 'react';
import * as classNames from 'classnames';

import './TextEntry.css';

interface IProps {
    name: string;
    label: string;
    inputType: string;
    value: string;
    className?: string;
    showError?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextEntry = (props: IProps) => {
    const wrapperClassName = classNames(
        props.className,
        'text-entry'
    );

    const inputClassName = classNames(
        'text-entry-input',
        {'text-entry-error': props.showError}
    );

    return (
            <div className={wrapperClassName}>
                <label className="text-entry-label" htmlFor={props.name}>{props.label}</label>
                <input
                    className={inputClassName}
                    value={props.value}
                    onChange={props.onChange}
                    type={props.inputType}
                    name={props.name}
                />
            </div>
        );

};

export default TextEntry;