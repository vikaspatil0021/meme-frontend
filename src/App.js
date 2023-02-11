import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/Auth/login";
import Register from './components/Auth/register.js';
import Dashboard from './components/Dashboard/dashboard.js';
import Story from './components/stories/story/story.js';
import Compose from './components/compose/compose.js';
import UpdateStory from './components/compose/update.js';
import People from './components/people/people.js';
import Person from './components/people/person/person.js';
import Nav from './components/Header/header.js';
import Memes from './components/stories/stories.js';
import Main from './components/main/main';
function App() {
  const [recievedData, setRecievedData] = useState('');

  const updateStoryData = (storyId) => {
    setRecievedData(storyId);
  }

  setTimeout(function () {
    document.getElementById('refresh-button').style.visibility = "visible";
  }, 10000);

  return (
    <div className="h-100">
      <Router>
      <Nav />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/compose' exact element={<Compose />} />
          <Route path='/dashboard' exact element={<Dashboard updateStory={updateStoryData} />} />
          <Route path='/dashboard/update' exact element={<UpdateStory rStory={recievedData} />} />
          <Route path='/memes' exact element={<Memes />} />
          <Route path='/memes/:id' exact element={<Story />} />
          <Route path='/people' exact element={<People />} />
          <Route path='/people/:username' exact element={<Person />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
