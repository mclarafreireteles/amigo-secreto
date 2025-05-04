'use client'

import { useEffect, useState } from "react";
import { addParticipant, getDB, saveDrawResults } from "../lib/idb";
import { drawSecretFriend } from "../core/draw";

export default function Add() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [participants, setParticipants] = useState([]);
    const [draw, setDraw] = useState([]);

    useEffect(() => {
        async function loadParticipants() {
            const db = await getDB();
            const tx = db.transaction('participants', 'readonly');
            const store = tx.objectStore('participants');
            const all = await store.getAll();
            setParticipants(all);
        }
    
        loadParticipants();
    }, [])

    const handleAdd = async () => {
        const newParticipant = { name, email };
        await addParticipant(newParticipant);

        const db = await getDB();
        const tx = db.transaction('participants', 'readonly');
        const store = tx.objectStore('participants');
        const allParticipants = await store.getAll();  // Pega todos os participantes
        setParticipants(allParticipants); 
        setName('');
        setEmail('');

        try {
            await fetch('api/participants', {
                method: POST,
                body: JSON.stringify(newParticipant),
                headers: { 'Content-type': 'application/json'},
            })
        } catch(err) {
            console.warn('Sem conexão: dados salvos apenas localmente.');
        }
    }

    const handleRaffle = async () => {
      try {
        const result = await drawSecretFriend(participants);
        setDraw(result);

        // Adicione aqui um log para verificar o resultado antes de salvar
        console.log("Resultado do sorteio antes de salvar:", result);

        await saveDrawResults(result);
      } catch (err) {
        alert(err.message);
        console.error(err, 'Erro ao realizar sorteio');
      }
    }

    return (
        <main>
          <h1>Participantes</h1>
          <input
            type="text"
            value={name}
            placeholder="Digite um nome"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleAdd}>
            Adicionar
          </button>
          <ul>
            {participants.map((p, i) => (
              <li key={i}>{p.name}</li>
            ))}
          </ul>

          <button onClick={handleRaffle}>Sortear Amigo Secreto</button>
          <ul>
            {draw.map((par) => (
              <li key={par.token}>
                {par.from}: <a href={`/reveal/${par.token}`} target="_blank">Ver meu amigo secreto</a>
              </li>
            ))}
          </ul>
        </main>
    )
}

