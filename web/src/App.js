import React from 'react';
import './Global.css';
import './App.css'
import './SideBar.css'

function App(){


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
                <input name="latitude" id="latitude" required></input>
              </div>

              <div className = "input-block">
                <label htmlFor="longitude">longitude</label>
                <input name="longitude" id="longitude" required></input>
              </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
      </aside>
      <main></main>
    </div>
  );
}

export default App;