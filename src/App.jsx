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
import ProductDetails from './components/products/ProductDetails'
import CustomCursor from './CustomCursor'

function App() {

  return (
   <div className='bg-slate-950'>
    <CustomCursor />
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
        <Route path='products/:id' element={<ProductDetails />} />
      </Route>
    </Routes>
   </div>
  )
}

export default App
