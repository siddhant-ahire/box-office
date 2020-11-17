const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGET(queryString) {
    const response = await fetch(`${API_BASE_URL}${queryString}`)
    return response;
}