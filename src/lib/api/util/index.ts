const apiBaseUrl = 'http://localhost:8080/v2.0';

interface IResponse<T> {
    status: number;
    data?: T;
}

function isSuccessResponse(status: number): boolean {
    return (status > 199 && status < 300) || status === 304;
}

export function addAuthenticationHeader(options: RequestInit, token: string): RequestInit {
    return {...options, headers: {...options.headers, 'Authorization': token}};
}
export async function get<T>(relativePath: string, options?: RequestInit): Promise<T> {
    const finalOptions: RequestInit = Object.assign(
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        },
        options
    );
    if (options && options.headers) {
        finalOptions.headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers);
    }
    const response = await fetch(`${apiBaseUrl}/${relativePath}`, finalOptions);

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}

export async function post<T>(relativePath: string, body?: {}, options?: RequestInit): Promise<T> {
    const finalOptions: RequestInit = Object.assign(
        {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        },
        options
    );
    if (options && options.headers) {
        finalOptions.headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers);
    }
    const response = await fetch(`${apiBaseUrl}/${relativePath}`, finalOptions);

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}

export async function put(relativePath: string, body?: {}, options?: RequestInit): Promise<{}> {
    const response = await fetch(`${apiBaseUrl}/${relativePath}`, Object.assign(
        {
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        },
        options)
    );

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}
