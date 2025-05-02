import { headers } from "next/headers";

let serverParticipants = [];

export async function POST(request) {
    const participant = await request.json();
    serverParticipants.push(participant);
    return new Response(JSON.stringify({ 
        message: "Participant added successfully" }), 
        { status: 201 }, 
        headers({ "Content-Type": "application/json" }
    ));
}

export async function GET() {
    return new Response(JSON.stringify(serverParticipants), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
    });
}