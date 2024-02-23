import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Post from './Post'
import User from './User'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Post/>} />
          <Route path='/user' element={<User/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
