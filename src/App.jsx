import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Calender from './components/Calender'; 
import StartPage from './components/StartPage';
import './App.css';
import Analyze from './components/Analyze';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Define a route for /Calender */}
        <Route path="/Calender" element={<Calender />} />
        <Route path='/StartPage' element={<StartPage/>}/>
        <Route path='/Analyze' element={<Analyze/>}/>
      </Routes>
    </Router>
  );
}

export default App;
