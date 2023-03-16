import './App.css';
import AuthorMainPage from './components/AuthorMainPage';
import AuthorCreate from './components/AuthorCreate';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AuthorEdit from './components/AuthorEdit';

function App() {

  const [ allAuthors, setAllAuthors] = useState([]);

  return (
    <div>
      <Routes>
        <Route path='/' default element={<AuthorMainPage allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
        <Route path='/new' element={<AuthorCreate allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
        <Route path='/authors/edit/:id' element={<AuthorEdit allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
      </Routes>
    </div>
  );
}

export default App;
