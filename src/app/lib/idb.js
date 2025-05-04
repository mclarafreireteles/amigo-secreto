import { openDB } from "idb";

export async function getDB() {
    return await openDB('ParticipantsDB', 3, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('participants')) {
                db.createObjectStore('participants', { keyPath: 'id', autoIncrement: true }); 
            }

            if (!db.objectStoreNames.contains('draws')) {
                db.createObjectStore('draws', { keyPath: 'token' });
            }
        },
    });
}

export async function addParticipant(participant) {
    const db = await getDB();
    await db.add('participants', participant);
}

export async function getAllParticipants() {
    const db = await getDB();
    return await db.getAll('participants');
}

export async function saveDrawResults(results) {
    const db = await getDB();
    const tx = db.transaction('draws', 'readwrite');
    const store = tx.objectStore('draws');

    // Log para verificar os dados antes de salvar
    console.log("Salvando resultados no IndexedDB:", results);

    for (const result of results) {
        console.log("Tentando salvar o resultado:", result); 
        await store.put({ token: result.token, message: `Seu amigo secreto é ${result.to}` });
    }

    await tx.done;
    console.log("Resultados salvos com sucesso.");
}
  
export async function getDrawMessage(token) {
    // const db = await getDB();
    // return await db.get('draws', token);
    const db = await getDB();
    const draw = await db.get('draws', token);
    if (!draw) {
        throw new Error("Resultado não encontrado");
    }
    return draw;
}
  