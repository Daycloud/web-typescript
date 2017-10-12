import * as React from 'react';

import Spinner from '../spinner/Spinner';

import TokenManagerInstance from '../../lib/api/TokenManager';

interface IProps {
    url: string;

}

interface IState {
    isLoading: boolean;
    imgSrc?: string;
}

const fetchRequest = (url: string, accessToken: string) => fetch(url, {
    method: 'get',
    headers: {
        'Authorization': accessToken
    }
});

class ImageContainer extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const instance = this;
        fetchRequest(this.props.url, TokenManagerInstance.accessToken!)
            .then(function(response: Response) {
                response.blob().then((imageData) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(imageData);
                    reader.onloadend = function() {
                        const base64data = reader.result;
                        instance.setState({
                            isLoading: false,
                            imgSrc: base64data
                        });
                    };
                });
            });
    }

    component = () => {
        if (this.state.isLoading) {
            return (
                <div style={{position: 'absolute', display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
                    <Spinner colorClassName="bg-primary" />
                </div>
            );
        } else {
            return <img className="cloud-image" src={this.state.imgSrc!}/>;
        }
    }

    render () {
        return (
            this.component()
        );
    }

}

export default ImageContainer;