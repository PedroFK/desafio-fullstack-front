import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Plans from './components/Plans';
import { User } from './pages/User'

export function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/plans" element={<Plans />} />
      <Route path='/user' element={<User />} />
    </Routes>
  )
}
