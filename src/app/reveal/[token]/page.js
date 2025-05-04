'use client';
import { useEffect, useState } from 'react';
import { getDrawMessage } from '../../lib/idb';
import { useParams } from 'next/navigation';

export default function RevealPage() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadMessage() {
      const result = await getDrawMessage(token);
      if (result) {
        setMessage(result.message);
      } else {
        setMessage('Link inválido ou resultado não encontrado.');
      }
    }
    loadMessage();
  }, [token]);

  return (
    <main>
      <h1>Resultado do Amigo Secreto</h1>
      <p>{message}</p>
    </main>
  );
}