import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './pages/Home' 
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;