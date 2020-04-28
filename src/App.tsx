import React from 'react';
import './App.css';
import Stepper from './components/stepper/Stepper'
import img from './pencil.png'

function App() {
  return (
    <>
      <h1 className="center heading"><img alt="Logo" src={img}/> Mail Writer</h1>
      <Stepper />
    </>
  );
}

export default App;
