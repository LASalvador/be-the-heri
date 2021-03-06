import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';
import { FiLogIn} from 'react-icons/fi';
import api from '../../services/api';


function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', {id});
            console.log(response.data);
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.ong.name);
            history.push('/profile')
        } catch (error) {
            alert(error);
        }

    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={logo} alt="Logo be the hero"/>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setID(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroesImage} alt="Heroes"/>
    </div>
    )
}


export default Logon;