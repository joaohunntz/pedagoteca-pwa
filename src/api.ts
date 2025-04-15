import axios from 'axios'

// Base da API sem /api
const api = axios.create({
  baseURL: 'https://app--pedagoteca-e66859b3.base44.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Exemplo de login
export async function login(email: string, senha: string) {
  const res = await api.post('/login', { email, senha })
  return res.data
}

// Exemplo de buscar recursos (ajuste a rota conforme seu backend)
export async function getRecursos() {
  const res = await api.get('/recursos')
  return res.data
}
