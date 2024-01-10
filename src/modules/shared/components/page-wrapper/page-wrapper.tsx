import { Outlet } from 'react-router-dom'
import { Navbar } from '#shared/components/navbar/navbar'

/**
 * wrap the page with navbar
 */
export function PageWrapper() {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  )
}
