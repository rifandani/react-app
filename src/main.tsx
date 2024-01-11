import { createRoot } from 'react-dom/client'
import { Entry } from '#app/entry'
import './main.css'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

createRoot(root!).render(<Entry />)
