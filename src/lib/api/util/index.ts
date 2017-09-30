
const api_base_url = 'http://localhost:8080/';

function isSuccessResponse(status: number): boolean {
    return status > 199 && status < 300;
}
export async function get(relativePath: string, options?: RequestInit): Promise<any> {
    const response = await fetch(`${api_base_url}/${relativePath}`, Object.assign(
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }, options)
    );

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}

export async function post(relativePath: string, body?: any, options?: RequestInit): Promise<any> {
    const response = await fetch(`${api_base_url}/${relativePath}`, Object.assign(
        {
            body: body,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'POST'
        }, options)
    );

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
                'Content-Type':'application/json'
            },
            method: 'PUT'
        }, options)
    );

    if (!isSuccessResponse(response.status)) {
        throw new Error(String(response.status));
    }

    return await response.json();
}
