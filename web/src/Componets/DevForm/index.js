import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";

function DevForm({ onSubmit, onUpdate, onCancel, dev }){
    const [devEditable, setDevEditable] = useState("");
    const [_id, setId] = useState("");
    const [name, setName] = useState("");
    const [avatar_url, setAvatar] = useState("");
    const [github_username, setgithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000
          }
        );
      },[]);
      useEffect(() => {
        if (dev) {
          setDevEditable(true);
          setId(dev._id);
          setgithub_username(dev.github_username);
          setName(dev.name);
          setAvatar(dev.avatar_url);
          setTechs(dev.techs.join(", "));
          setLatitude(dev.location.coordinates[1]);
          setLongitude(dev.location.coordinates[0]);
        }
      }, [dev]);

      async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        setgithub_username('');
        setTechs('');
      }
      async function handleUpdate(e) {
        e.preventDefault();
        await onUpdate({
          _id,
          avatar_url,
          name,
          techs,
          latitude,
          longitude
        });
        handleCancel();
      }
      function handleCancel() {
        onCancel(true);
        setDevEditable(false);
        setId("");
        setgithub_username("");
        setName("");
        setAvatar("");
        setTechs("");
      }

    return(
      <>
        <div className="d-flex">
          <strong> {devEditable ? "Editar" : "Cadastrar"}</strong>
          <i title="Cancelar" className={!devEditable ? "d-none" : ""} onClick={handleCancel}>
            <FontAwesomeIcon icon={faChevronCircleLeft} color="blueviolet"></FontAwesomeIcon>  
          </i>
        </div>  
        <form onSubmit={devEditable ? handleUpdate : handleSubmit }>
            <div className = {`input-block ${!devEditable ? "" : "d-none"}`}>
                <label htmlFor="github_username">Usuário do Github</label>
                <input 
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    disabled={devEditable ? true : false}
                    onChange={e => setgithub_username(e.target.value)}
                />
            </div>

            <div className={`input-block ${devEditable ? "" : "d-none"}`}>
              <label htmlFor="name">Nome</label>
              <input
                name="name"
                id="name"
                value={name}
                disabled={devEditable ? false : true}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className={`input-block ${devEditable ? "" : "d-none"}`}>
              <label htmlFor="avatar_url">Avatar</label>
              <input
                name="avatar_url"
                id="avatar_url"
                value={avatar_url}
                disabled={devEditable ? false : true}
                onChange={e => setAvatar(e.target.value)}
              />
            </div>
           
            <div className = "input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                name="techs" 
                id="techs" 
                required
                value = {techs}
                onChange ={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                
                <div className = "input-block">
                    <label htmlFor="latitude">latitude</label>
                    <input 
                        type ="number"
                        name="latitude"
                        id="latitude"
                        required 
                        value = {latitude}
                        onChange ={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className = "input-block">
                    <label htmlFor="longitude">longitude</label>
                    <input type ="number" 
                        name="longitude" 
                        id="longitude" 
                        required value = {longitude}
                        onChange ={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
      </>
    )
}
export default DevForm;