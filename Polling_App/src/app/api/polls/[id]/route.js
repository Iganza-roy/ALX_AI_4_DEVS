import { NextResponse } from 'next/server';
import { getPollById } from '@/lib/database';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const poll = await getPollById(id);
        if (!poll) {
            return NextResponse.json({ message: 'Poll not found' }, { status: 404 });
        }
        return NextResponse.json(poll);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching poll' }, { status: 500 });
    }
}