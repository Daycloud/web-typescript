import * as React from 'react';
import * as classNames from 'classnames';

import './Spinner.css';

interface IProps {
    small?: boolean;
    large?: boolean;
    colorClassName?: string;
}

const Spinner = (props: IProps) => {

    const className = classNames(
        'spinner',
        {'spinner-large': props.large},
        {'spinner-small': props.small}
    );

    return (
        <div className={className}>
            <div className={'bounce1 ' + props.colorClassName}/>
            <div className={'bounce2 ' + props.colorClassName}/>
            <div className={'bounce3 ' + props.colorClassName}/>
        </div>
    );
};

export default Spinner;