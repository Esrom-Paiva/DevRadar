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
  const [dev, setDev] = useState("");

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

  async function handleUpdateDev(data){

    await Api.put(`/devs/${data._id}`,data);
    setDevs("");
  }

  function handleCancelEdit() {
    setDev("");
  }
  
  function handleEditDev(data) {
    setDev(data);
  }

  async function handleDeleteDev(data){

    await Api.delete(`/devs/${data._id}`);
    setDevs(devs.filter(dev => dev !== data));
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Devform 
        onSubmit = {handleAddDev}
        onUpdate = {handleUpdateDev}
        onCancel = {handleCancelEdit}
        dev={dev}
      />
      </aside>

      <main>
        <ul>
          {devs.map(dev =>(
            <DevItem  
              key = {dev._id} 
              dev = {dev}
              onEdit = {handleEditDev}
              onDestroy = {handleDeleteDev}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;