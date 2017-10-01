
const api_base_url = 'http://localhost:8080/v2.0';

function isSuccessResponse(status: number): boolean {
    return status > 199 && status < 300;
}

export function addAuthenticationHeader(options: RequestInit, token: string): RequestInit {
    return {...options, headers: {...options.headers, 'Authorization':token}};
}
export async function get(relativePath: string, options?: RequestInit): Promise<any> {
    const finalOptions: RequestInit = Object.assign(
        {
            headers: {
                'Content-Type':'application/json'
            },
            method: 'GET'
        }, options
    );
    if (options && options.headers) {
        finalOptions.headers = Object.assign({ 'Content-Type':'application/json' }, options.headers);
    }
    console.log(finalOptions);
    const response = await fetch(`${api_base_url}/${relativePath}`, finalOptions);

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}

export async function post(relativePath: string, body?: any, options?: RequestInit): Promise<any> {
    const finalOptions: RequestInit = Object.assign(
        {
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json'
            },
            method: 'POST'
        }, options
    );
    if (options && options.headers) {
        finalOptions.headers = Object.assign({ 'Content-Type':'application/json' }, options.headers);
    }
    const response = await fetch(`${api_base_url}/${relativePath}`, finalOptions);

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}

export async function put(relativePath: string, body?: any, options?: RequestInit): Promise<any> {
    const response = await fetch(`${api_base_url}/${relativePath}`, Object.assign(
        {
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }, options)
    );

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}
