import React, {useEffect,useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {FiPower, FiTrash2} from "react-icons/all";
import logoImg from '../../assets/logo.jpg'

import './style.css'
import api from "../../services/api";
export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(()=> {
        api.get('profile',{
            headers:{
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    },[ongId])

    async function handleDeleteIncidents(id) {
        try {
          await api.delete('incidents/'+id,{
              headers: {
                  Authorization: ongId
              }
          })

            setIncidents(incidents.filter(incidents => incidents.id !== id))
        }catch (e) {
            alert("Erro ao deletar caso")
        }
    }

    function handleLogout() {
      localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Kraken"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#2f0a14"/>
                </button>
            </header>

            <h1>Casos registrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>Caso: </strong>
                        <p>{incidents.title}</p>
                        <strong>Descrição: </strong>
                        <p>{incidents.description}</p>
                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
                        <button onClick={() => handleDeleteIncidents(incidents.id)} type="button">
                            <FiTrash2 fize={20} color="#2f0a14"/>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}