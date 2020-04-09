import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/all";
import api from "../../services/api";
import './style.css'

import logoImg from '../../assets/logo.jpg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setwhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()
        const data = {name,email,whatsapp,city,uf}
        const response = await api.post('ongs',data)



        try {
            alert(`Seu id de acesso: ${response.data.id}`)
            history.push('/profile')
        }catch (e) {
            alert("Erro gerado: "+e)
        }

    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Kraken"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro na plataforma, entre em contato com o 3º SGT Dos Santos <strong>(92) 98481-9707</strong> para liberar seu acesso</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="2f0a14"/>
                        Voltar para o Home
                    </Link>
                </section>
                <form action="" onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome" value={name} onChange={e=> setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e=> setEmail(e.target.value)}/>
                    <input type="text" placeholder="WhatsApp" value={whatsapp} onChange={e=> setwhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input type="text" placeholder="Cidade" value={city} onChange={e=> setCity(e.target.value)}/>
                        <input type="text" placeholder="UF" style={{width: 80}} value={uf} onChange={e=> setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>

                </form>


            </div>
        </div>
    )
}