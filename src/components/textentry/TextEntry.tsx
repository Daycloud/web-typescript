import * as React from 'react';
import * as classNames from 'classnames';

import './TextEntry.css';

interface IProps {
    name: string;
    label: string;
    inputType: string;
    className?: string;
}

const TextEntry = (props: IProps) => {
    const className = classNames(props.className, 'text-entry');
    return (
            <div className={className}>
                <label className="text-entry-label" htmlFor={props.name}>{props.label}</label>
                <input className="text-entry-input" type={props.inputType} name={props.name} />
            </div>
        );

};

export default TextEntry;