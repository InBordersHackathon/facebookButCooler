import './App.css';

function App() {
 

  const getData = async function (url = '') {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
    });
    return response?.json();
  }

  let text = "";

 getData('http://localhost:3001').then(data => {
  console.log({data});
  text = data;
 });
  
  return (
    <div className="App">
      <div>
      {text}
      </div>
    </div>
  );
}

export default App;
