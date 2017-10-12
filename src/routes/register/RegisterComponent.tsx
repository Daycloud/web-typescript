import * as React from 'react';
import RegisterFormContainer from '../../components/register/RegisterFormContainer';

const RegisterComponent = () => {

    return (
        <div className="center-horizontal">
            <div className="w-33">
                <RegisterFormContainer loginRedirect="/login"/>
            </div>
        </div>
    );
};

export default RegisterComponent;