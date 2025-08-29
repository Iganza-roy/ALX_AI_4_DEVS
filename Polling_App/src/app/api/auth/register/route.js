import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(request) {
    const { username, email, password } = await request.json();

    try {
        const user = await createUser({ username, email, password });
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}