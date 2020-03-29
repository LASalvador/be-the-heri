import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft} from 'react-icons/fi'
import './styles.css';
import api from '../../services/api';


export default function NewIncident() {
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const [value, setValue ] = useState('');
    const ongID = localStorage.getItem('ongID');
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

       try {
        api.post('incidents', data,{
            headers: {
                Authorization: ongID,
           },
        }).then(()=> {
            history.push('/profile')
        })

       } catch (error) {
          alert('Error ao criar incident') 
       }
    }
    return (
        <div className="new-incident-container">
           <div className="content">
               <section>
                <img src={logo} alt="Logo be the hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso
                </p>
               <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>                
               </section>                
               <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em dinheiro"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
               </form> 
           </div>
       </div>
    );
}