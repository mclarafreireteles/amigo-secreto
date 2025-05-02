import { openDB } from "idb";

export async function getDB() {
    return await openDB('ParticipantsDB', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('participants')) {
                db.createObjectStore('participants', { keyPath: 'id', autoIncrement: true }); 
            }
        },
    });
}

export async function addParticipant(participant) {
    const db = await getDB();
    await db.add('participants', participant);
}