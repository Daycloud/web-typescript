import * as React from 'react';

import Spinner from '../spinner/Spinner';

import './Button.css';
import * as classNames from 'classnames';

interface IProps {
    text: string;
    loading: boolean;
    className: string;

    onClick?: () => void;
}

const Button = (props: IProps) => {
    const className = classNames(props.className, 'button')
    return (
        <button className={className} onClick={props.onClick}>
            {props.loading
                ? <Spinner />
                : props.text
            }

        </button>
    );
};

export default Button;