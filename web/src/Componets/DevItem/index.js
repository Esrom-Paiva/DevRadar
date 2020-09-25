import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function DevItem({ dev,onEdit, onDestroy }){

  function handleEditDev(dev) {
    onEdit(dev);
  }
  async function handleDestroyDev(dev) {
    await onDestroy(dev);
  }

    return(
        <li className ="dev-item">
          <header>
            <img src ={dev.avatar_url} alt={dev.name}></img>
            <div className = "user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <div className="user-footer">
            <a href={`https://github.com/${dev.github_username}`}>Acesso ao perfil no GitHub</a> 
            <div className="user-button">
              <button title="Editar usuário" onClick={() => handleEditDev(dev)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button title="Remover usuário" onClick={() => handleDestroyDev(dev)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </li>  
    )
}

export default DevItem;