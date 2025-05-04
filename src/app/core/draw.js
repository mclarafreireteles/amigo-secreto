import { v4 as uuidv4 } from 'uuid';

export function drawSecretFriend(participants) {

    if (!participants || participants.length < 2) {
        throw new Error("É necessário pelo menos 2 participantes")
    }

    let drawn = [...participants];

    for (let i = drawn.length - 1; i > 0; i --) {
        const j = Math.floor(Math.random() * (i + 1));
        [drawn[i], drawn[j]] = [drawn[j], drawn[i]];
    }

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === drawn[i].id) {
            return drawSecretFriend(participants);
        }
    }

    // return participants.map((p, i) => ({
    //     id: uuidv4(),
    //     from: p.name,
    //     to: drawn[i].name
    // }))

    const result = participants.map((p, i) => ({
        id: p.id,
        from: p.name,
        to: drawn[i].name,
        token: uuidv4(),
    }));

    console.log("Resultado do sorteio:", result);  // Verifique se o resultado é como esperado

    return result;

}