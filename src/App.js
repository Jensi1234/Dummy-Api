import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Posts from './components/Posts'
import Users from './components/Users';
import PostDetails from './components/PostDetails';
import UserDetails from './components/UserDetails';
import Navbar from './components/Navbar'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/user' element={<Users />} />
          <Route path='/post/:pid' element={<PostDetails />} />
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;



