# 🎁 Amigo Secreto

> Um app simples de sorteio de Amigo Secreto que funciona 100% no navegador, com persistência local usando IndexedDB e geração de links individuais para revelar o resultado.

---

## ✨ Funcionalidades

- Cadastro de participantes com nome e e-mail
- Armazenamento local no navegador via **IndexedDB**
- Sorteio aleatório com verificação para evitar autoatribuição
- Geração de links personalizados com **token único** para cada participante
- Visualização individual do amigo secreto via rota dinâmica (`/reveal/:token`)

---

## 🧪 Tecnologias Utilizadas

- [Next.js 14+ (App Router)](https://nextjs.org/docs/app/building-your-application/routing)
- JavaScript (ES6+)
- [IndexedDB via idb](https://www.npmjs.com/package/idb) (API wrapper)
- [uuid](https://www.npmjs.com/package/uuid) (para geração de tokens únicos)

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/amigo-secreto.git
cd amigo-secreto
npm install
npm run dev
http://localhost:3000
