import React, {useState, useEffect} from 'react';
import './Global.css';
import './App.css'
import './SideBar.css'
import './Main.css'

function App(){
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setlatitude(latitude);
        setlongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  },[])
  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className = "input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input name="github_username" id="username_github" required></input>
            </div>
            <div className = "input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input name="techs" id="techs" required></input>
            </div>

            <div className="input-group">
              
              <div className = "input-block">
                <label htmlFor="latitude">latitude</label>
                <input 
                type ="number"
                 name="latitude"
                  id="latitude"
                   required value = {latitude}
                   onChange ={event => setlatitude(event.target.value)}
                   />
              </div>

              <div className = "input-block">
                <label htmlFor="longitude">longitude</label>
                <input type ="number" 
                name="longitude" 
                id="longitude" 
                required value = {longitude}
                onChange ={event => setlongitude(event.target.value)}
                />
              </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className ="dev-item">
            <header>
              <img src ="https://avatars0.githubusercontent.com/u/43820735?v=4"></img>
              <div className = "user-info">
                <strong>Esrom de Paiva</strong>
                <span>.net, node.js python</span>
              </div>
            </header>
            <p>Desenvolvedor com foco em back-end que as vezes se aventura no front</p>
            <a href="https://github.com/Esrom-Paiva">Acesso ao perfil no github</a>
          </li>

          <li className ="dev-item">
            <header>
              <img src ="https://avatars0.githubusercontent.com/u/43820735?v=4"></img>
              <div className = "user-info">
                <strong>Esrom de Paiva</strong>
                <span>.net, node.js python</span>
              </div>
            </header>
            <p>Desenvolvedor com foco em back-end que as vezes se aventura no front</p>
            <a href="https://github.com/Esrom-Paiva">Acesso ao perfil no github</a>
          </li>

          <li className ="dev-item">
            <header>
              <img src ="https://avatars0.githubusercontent.com/u/43820735?v=4" alt="Esrom de Paiva"></img>
              <div className = "user-info">
                <strong>Esrom de Paiva</strong>
                <span>.net, node.js python</span>
              </div>
            </header>
            <p>Desenvolvedor com foco em back-end que as vezes se aventura no front</p>
            <a href="https://github.com/Esrom-Paiva">Acesso ao perfil no github</a>
          </li>

          <li className ="dev-item">
            <header>
              <img src ="https://avatars0.githubusercontent.com/u/43820735?v=4"></img>
              <div className = "user-info">
                <strong>Esrom de Paiva</strong>
                <span>.net, node.js python</span>
              </div>
            </header>
            <p>Desenvolvedor com foco em back-end que as vezes se aventura no front</p>
            <a href="https://github.com/Esrom-Paiva">Acesso ao perfil no github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;