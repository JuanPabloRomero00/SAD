import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './pages/Home'
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer'
import Login from './pages/Login';
import Activities from './pages/Activities';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <div className='appContainer'>
        <header>
          <Header></Header>
        </header>
        <main className='mainContainer'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/activities' element={<Activities />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
}

export default App;