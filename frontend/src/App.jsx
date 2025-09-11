import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './pages/Home' 

function App() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route>

          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;