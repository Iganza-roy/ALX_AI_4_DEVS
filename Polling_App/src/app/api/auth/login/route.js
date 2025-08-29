import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const user = await loginUser(email, password);
        if (user) {
            return NextResponse.json({ message: 'Login successful', user });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
    }
}