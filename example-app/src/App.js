import './App.css';

function App() {
  async function getData() {
    // const resp = await fetch('http://localhost:3001/', {
    //   method: 'get'
    //   // mode: 'no-cors'
    // });
    // return await resp.json();
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

 const data = getData();
 console.log("data", data);
  
  return (
    <div className="App">
      <header className="App-header">
        {{ data }}
      </header>
    </div>
  );
}

export default App;
