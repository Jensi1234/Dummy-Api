import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Post from './Post'
import User from './User'
import Comment from './Comment';
import UserDetail from './UserDetail'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/user' element={<User />} />
          <Route path='/post/:pid' element={<Comment />} />
          <Route path='/user/:userId' element={<UserDetail/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
