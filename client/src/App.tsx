import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Layout } from './Layout'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { useRecoilState } from 'recoil'
import { authState } from './state/authState'
import { useEffect } from 'react'
import { Places } from './pages/Places'

function App() {
    const [auth,setAuth] = useRecoilState(authState)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if(storedUser){
      setAuth(JSON.parse(storedUser))
    }
  },[setAuth])





  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} >
            <Route path="/" element={<Landing />  } />
            <Route path="/login" element={<Login />  } />
            <Route path="/register" element={<Register />  } />
            <Route path="/dashboard" element={<Dashboard />  } />
            <Route path="/dashboard/:subpage" element={<Dashboard />  } />
            <Route path="/dashboard/:subpage/:action" element={<Dashboard />  } />

      </Route>
    </Routes>
   
    </>
  )
}

export default App
