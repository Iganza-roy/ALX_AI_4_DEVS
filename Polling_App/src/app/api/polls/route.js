// This file handles the API route for fetching and creating polls.

import { NextResponse } from 'next/server';
import { getPolls, createPoll } from '../../../lib/database';

export async function GET() {
    try {
        const polls = await getPolls();
        return NextResponse.json(polls);
    } catch (error) {
        return NextResponse.error();
    }
}

export async function POST(request) {
    const data = await request.json();
    try {
        const newPoll = await createPoll(data);
        return NextResponse.json(newPoll, { status: 201 });
    } catch (error) {
        return NextResponse.error();
    }
}