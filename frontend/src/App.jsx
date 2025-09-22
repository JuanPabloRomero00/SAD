import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './pages/Home'
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer'

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
            <Route></Route>
            <Route></Route>
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