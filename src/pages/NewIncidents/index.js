import React,{useState} from "react";
import logoImg from "../../assets/logo.jpg";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/all";

import './style.css'
import api from "../../services/api";

export default function NewIncidents() {

    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value,setValue] = useState('')
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    async function handleRegister(e) {
        e.preventDefault()
        const data = {title,description,value}
        try {
            alert('Cadastrado com sucesso')
            const response = await api.post('incidents',data,{
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        }catch (e) {
            alert("Erro gerado: "+e)
        }

    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Kraken"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o cadastro</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="2f0a14"/>
                        Voltar para o Home
                    </Link>
                </section>
                <form action="" onSubmit={handleRegister}>
                    <input type="text" placeholder="Titulo do caso" value={title} onChange={e=> setTitle(e.target.value)}/>
                    <textarea type="email" placeholder="Descrição" value={description} onChange={e=> setDescription(e.target.value)}/>
                    <input type="text" placeholder="Valor em reais" value={value} onChange={e=> setValue(e.target.value)}/>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>

                </form>


            </div>
        </div>
    )
}
