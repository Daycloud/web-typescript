// facebook api login promsise wrapper to support async await
export function facebookLogin(): Promise<fb.AuthResponse> {
    return new Promise((resolve, reject) => {
        FB.login((response: fb.AuthResponse) => {
            if (response.authResponse.accessToken) {
                return resolve(response);
            }
            return resolve();
        });
    });
}