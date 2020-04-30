import React from 'react';
import './App.css';
import Stepper from './components/stepper/Stepper'
import img from './pencil.png'
import { MailProvider } from './context/MailContext';

function App() {
  return (
    <>
      <h1 className="center heading"><img alt="Logo" src={img} /> Mail Writer</h1>
      <MailProvider>
        <Stepper />
      </MailProvider>
    </>
  );
} 

export default App;
