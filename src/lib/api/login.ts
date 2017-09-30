
import { post } from './util';
import { User } from './dto/User';

const facebookLoginPath = 'facebooklogin';
const localLoginPath = 'login';

interface IFacebookLoginResponseBody {
    user: User
}
export async function facebookLoginRequest(fbToken: string): Promise<IFacebookLoginResponseBody> {
    const body = {
        fbToken: fbToken,
    };
    const response: IFacebookLoginResponseBody = await post(facebookLoginPath, body);
    return response;
}

interface ILoginResponseBody {
    user: User
}
export async function localLoginRequest(username: string, password: string): Promise<ILoginResponseBody> {
    const body = {
        username: username,
        password: password,
    };
    const response: ILoginResponseBody = await post(localLoginPath, body);
    return response;
}