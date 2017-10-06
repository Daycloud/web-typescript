const apiBaseUrl = 'http://localhost:8080/v2.0';

export interface IResponse<T> {
    status: number;
    data?: T;
}

export function isSuccessResponse(status: number): boolean {
    return (status > 199 && status < 300) || status === 304;
}
async function doRequest<T>(path: string, finalOptions: RequestInit): Promise<IResponse<T>> {
    try {
        const response = await fetch(path, finalOptions);
        return {
            status: response.status,
            data: (isSuccessResponse(response.status)) ? await response.json() : undefined,
        };
    } catch (e) {
        return {
            status: 0,
            data: undefined
        };
    }
}
export function addAuthenticationHeader(options: RequestInit, token: string): RequestInit {
    return { ...options, headers: { ...options.headers, 'Authorization': token } };
}
export async function get<T>(relativePath: string, options?: RequestInit): Promise<IResponse<T>> {
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
    return doRequest<T>(`${apiBaseUrl}/${relativePath}`, finalOptions);
}

export async function post<T>(relativePath: string, body: object = {}, options?: RequestInit): Promise<IResponse<T>> {
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

    return doRequest<T>(`${apiBaseUrl}/${relativePath}`, finalOptions);
}

export async function put<T>(relativePath: string, body: object = {}, options?: RequestInit): Promise<IResponse<T>> {
    const finalOptions: RequestInit = Object.assign(
        {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        },
        options
    );
    if (options && options.headers) {
        finalOptions.headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers);
    }

    return doRequest<T>(`${apiBaseUrl}/${relativePath}`, finalOptions);
}
