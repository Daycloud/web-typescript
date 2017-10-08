import * as React from 'react';
import * as classNames from 'classnames';

import './Spinner.css';

interface IProps {
    small?: boolean;
    large?: boolean;
}

const Spinner = (props: IProps) => {

    const className = classNames(
        'spinner',
        {'spinner-large': props.large},
        {'spinner-small': props.small}
    );

    return (
        <div className={className}>
            <div className="bounce1"/>
            <div className="bounce2"/>
            <div className="bounce3"/>
        </div>
    );
};

export default Spinner;