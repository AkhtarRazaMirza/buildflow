// Example: src/lib/auth.ts
export const AUTH_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function register(fullName: string, email: string, password: string) {
    const response = await fetch(`${AUTH_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: Send cookies
        body: JSON.stringify({ full_name: fullName, email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
    }

    return response.json();
}

export async function login(email: string, password: string) {
    const response = await fetch(`${AUTH_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: Send cookies
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }

    return response.json();
}

export async function logout() {
    const response = await fetch(`${AUTH_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Important: Send cookies
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Logout failed');
    }

    return response.json();
}

export async function getCurrentUser() {
    const response = await fetch(`${AUTH_API_URL}/api/auth/me`, {
        credentials: 'include', // Important: Send cookies
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export async function refreshToken() {
    const response = await fetch(`${AUTH_API_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Important: Send cookies
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}
