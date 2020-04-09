import React, {useState} from 'react'
import {Link,useHistory} from "react-router-dom";
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import papelParadeImg from  '../../assets/papel-parede.png';
import logoImg from '../../assets/logo.jpg'
import api from "../../services/api";

export default function Logon() {
    const [id, setId] = useState()
    const history = useHistory()
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions',{id})
            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',response.data.name)

            history.push('profile')
            console.log(response.data.name)
        }catch (e) {
            alert("usuario não existe")
        }
    }

    return (
        <div className="logon-container">

            <section className="form">
                <img src={logoImg} alt="Papel de parede"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Sua Identidade militar" value={id} onChange={e=> setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="2f0a14"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={papelParadeImg} alt="Papel de parede"/>

        </div>
    )
}