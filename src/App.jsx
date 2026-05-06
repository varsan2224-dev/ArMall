import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './components/Home'
import Promotions from './components/Promotions'
import Brands from './components/Brands'
import News from './components/News'
import Login from './components/Login'
import SignUp from './components/SignUp'
import About from './components/About'
import Products from './components/products/Products'

function App() {

  return (
   <div className='bg-slate-950'>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='brands' element={<Brands />} />
        <Route path='promotions' element={<Promotions />} />
        <Route path='news' element={<News/>} />
        <Route path='about' element={<About/>} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='products/:id' />
      </Route>
    </Routes>
   </div>
  )
}

export default App
