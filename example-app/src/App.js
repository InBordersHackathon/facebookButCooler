import './App.css';

function App() {
  async function getData() {
    const resp = await fetch('http://localhost:3001/', {
      method: 'get'
    });
    return await resp.json();
  };

 const data = getData();
  
  return (
    <div className="App">
      <header className="App-header">
        {{ data }}
      </header>
    </div>
  );
}

export default App;
