// Importando os pacotes e arquivos necessários
import React, { useState, useEffect } from 'react';  // Adicionado o useEffect para efeitos colaterais
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

// Componente Modal para exibir mensagens de erro em uma janela popup
function Modal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${show ? 'show' : ''}`}> {/* Adicione/remova a classe 'show' com base na propriedade 'show' */}
                {children}<br></br><br></br>
                <button className='closeModal' onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}

// Objeto de mapeamento para tradução de erros
const errorTranslations = {
    "Invalid IP Address" : "Endereço de IP Inválido",
    "Reserved IP Address" : "Endereço de IP Reservado"
};

// Função para traduzir o erro
const translateError = (errorMessage) => {
    return errorTranslations[errorMessage] || errorMessage;
};

function App() {
    // Estado para armazenar o IP inserido pelo usuário
    const [ip, setIp] = useState("");
    // Estado para armazenar os dados retornados da API
    const [ipData, setIpData] = useState(null);
    // Estado para lidar com mensagens de erro
    const [error, setError] = useState(null);
    // Estado para controlar a visibilidade do modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Estado para armazenar o IP do usuário
    const [userIp, setUserIp] = useState(null);

    // Função assíncrona para consultar IP
    const consultarIP = async (inputIp) => {
        try {
            const response = await axios.get(`https://ipapi.co/${inputIp}/json/`);

            // Verificando se a resposta contém um erro
            if (response.data && response.data.error) {
                throw new Error(translateError(response.data.reason));
            }

            setIpData(response.data);
            setIsModalVisible(false);  // Fecha o modal se a chamada da API for bem-sucedida
        } catch (err) {
            // Definindo a mensagem de erro (seja da API ou uma mensagem genérica)
            setError(err.message || "Ocorreu um erro. Tente novamente.");
            setIsModalVisible(true);  // Mostra o modal se houver um erro
        }
    };

    // Função para buscar o IP do usuário assim que o componente for montado
    useEffect(() => {
        async function fetchUserIp() {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setUserIp(response.data.ip);
            } catch (error) {
                console.error("Erro ao obter IP do usuário:", error);
            }
        }

        fetchUserIp();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {/* Renderizando o IP do usuário */}
                <p className='UserIP'>{userIp ? `Seu IP é ${userIp}` : 'Obtendo seu IP...'}</p>
                <h2><center>Digite o IP a ser buscado:</center></h2>
                {/* Input para inserção do IP pelo usuário */}
                <input value={ip} onChange={e => setIp(e.target.value)}></input><br></br>
                {/* Botão que aciona a função de consulta ao ser clicado */}
                <button className='Buscar' onClick={() => consultarIP(ip)}>Buscar</button>
                {/* Se tiver dados do IP, eles são exibidos aqui */}
                {ipData && (
                    <div>
                        <p><strong>IP:</strong> {ipData.ip}</p>
                        <p><strong>Cidade:</strong> {ipData.city}</p>
                        <p><strong>Região:</strong> {ipData.region}</p>
                        <p><strong>País:</strong> {ipData.country_name}</p>
                        <p><strong>Provedora:</strong> {ipData.org}</p>
                    </div>
                )}
                <div><a><b>Integrantes do Grupo: </b>João Nishikawa e Fábio de Assís</a></div>
            </header>
            {/* Modal para exibir mensagens de erro */}
            <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)}>
                {error}
            </Modal>
        </div>
    );
}

export default App;
