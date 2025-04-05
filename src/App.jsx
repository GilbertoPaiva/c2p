import React from 'react';
import GraficoCombinado from './components/GraficoCombinado';
import './App.css';

function App() {
  return (
    <div className="App p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Análise de Dados - Engie Brasil vs Corporate DI</h1>
      <GraficoCombinado />
    </div>
  );
}

export default App;
