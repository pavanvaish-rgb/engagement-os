// Local dev server — reads .env.local and serves the dashboard at http://localhost:3000
// Run with: npm run dev

import { createServer } from 'http'
import { readFileSync } from 'fs'
import { parse } from 'url'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

createServer((req, res) => {
  const { pathname } = parse(req.url)

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (pathname === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({
      supabaseUrl:     process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }))
  }

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(readFileSync('./index.html'))
}).listen(3000, () => {
  console.log('Engagement OS → http://localhost:3000')
})
