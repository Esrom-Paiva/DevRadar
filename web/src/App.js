import React, {useState, useEffect} from 'react';
import Api from'./Service/Api';
import './Global.css';
import './App.css';
import './SideBar.css';
import './Main.css';
import DevItem from './Componets/DevItem';
import Devform from './Componets/DevForm';

function App(){
  const [devs, setDevs] = useState([]);


  useEffect(() =>{
    async function loadDevs(){
      const response = await Api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  },[]);

  async function handleAddDev(data){
    
    const response = await Api.post('/devs',data);
    setDevs([...devs, response.data]);
  }
  
  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Devform onSubmit = {handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev =>(
          <DevItem  key = {dev._id} dev = {dev}/>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;