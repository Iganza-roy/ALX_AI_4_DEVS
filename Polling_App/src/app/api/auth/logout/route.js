export async function POST(request) {
    // Logic to handle user logout
    // This could involve clearing session data, tokens, etc.

    // Example: Clear cookies or session storage
    // const { cookies } = request;
    // cookies.set('session', '', { maxAge: -1 });

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}