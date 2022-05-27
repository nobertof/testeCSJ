import React, { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { marker } from './Icons';
import { api } from './api';
import { FaRegEdit, FaTrashAlt,FaRecycle} from "react-icons/fa";
import Swal from 'sweetalert2';
const provider = new OpenStreetMapProvider();
const StyledPop = styled(Popup)`
  
  border-radius: 12px;
  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    width:300px;
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;
function initialStateLocal(){
  return {
    identificacao:'',
    capacidade:'',
    cep:'',
    cidade:'',
    bairro:'',
    numeroEndereco:'',
    complemento:'',
    logradouro:'',
  }
}
function App() {
  const [localization, setLocalization] = useState([-23.2198396, -45.8915658]);
  const [locais, setLocais] = useState([]);
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(initialStateLocal);
  const [errors, setErrors] = useState([]);
  function getPontos() {
    api.get('/locaisReciclagem').then(response => {
      console.log(response.data)
      setLocais(response.data)
    }).catch(e => {
      Swal.fire("Erro!","Erro ao tentar buscar os pontos de reciclagem");
    })
  }
  useEffect(() => {
    getPontos()
  }, [])
  function validacaoDeErros(){
    const conditions = [
      {name:'identificacao',allowNull:false, size:100, type:"string"},
      {name:'capacidade',allowNull:false, size:null,type:"number"},
      {name:'cep',allowNull:true, size:10,type:"string"},
      {name:'cidade',allowNull:false, size:50,type:"string"},
      {name:'bairro',allowNull:true, size:50,type:"string"},
      {name:'numeroEndereco',allowNull:true, size:10,type:"string"},
      {name:'complemento',allowNull:true, size:30,type:"string"},
      {name:'logradouro',allowNull:true, size:100,type:"string"}
    ]
    const erros = [];
    Object.keys(local).map(key=>{
      const [condition] = conditions.filter(value=>value.name===key);
      if(condition){
        if(!condition.allowNull && local[key].length==0){
          erros.push(key);
        }
        if(condition.type=="number" && isNaN(local[key])){
          erros.push(key);
        }
        if(condition.size && local[key].length>condition.size){
          erros.push(key);
        }
      }
    })
    console.log(erros)
    setErrors(erros);
    return erros.length;
  }
  function loadEndereco(local) {
    let endereco = '';
    if (local.cidade) {
      endereco += local.cidade;
    }
    if (local.logradouro) {
      endereco += endereco.length > 0 && ', ';
      endereco += local.logradouro;
    }
    if (local.bairro) {
      endereco += endereco.length > 0 && ', ';
      endereco += local.bairro;
    }
    if (local.complemento) {
      endereco += endereco.length > 0 && ', ';
      endereco += local.complemento;
    }
    if (local.numeroEndereco) {
      endereco += endereco.length > 0 && ', ';
      endereco += local.numeroEndereco;
    }
    return endereco;
  }
  function handleChange(e){
    const {name, value} = e.target;
    setLocal({
      ...local,
      [name]:value
    })
  }
  function handleSubmit(){
    const validacao = validacaoDeErros();
    
    if(validacao==0 && local.localReciclagem_id){
      editarLocal();
    }else if(validacao==0){
      cadastrarNovoLocal();
    }else{
      Swal.fire("Erro!","Preencha os campos corretamente", "error");
    }
  }
  function cadastrarNovoLocal(){
    const infosDeEnvio = {...local};

    infosDeEnvio.capacidade = parseFloat(infosDeEnvio.capacidade);
    api.post('/locaisReciclagem',infosDeEnvio).then(response=>{
      Swal.fire("Sucesso!", "Novo local cadastrado com sucesso!","success");
      setLocal(initialStateLocal)
      getPontos();
    }).catch(e=>{
      Swal.fire("Erro!", "Ocorreu um erro ao tentar adicionar um novo local!","error");
    })
  }
  function editarLocal(){
    const infosDeEnvio = {...local};
    delete infosDeEnvio.coordenadas;
    infosDeEnvio.capacidade = parseFloat(infosDeEnvio.capacidade);
    api.put(`/locaisReciclagem/${local.localReciclagem_id}`,infosDeEnvio).then(response=>{
      Swal.fire("Sucesso!", "Local editado com sucesso!","success");
      getPontos();
    }).catch(e=>{
      Swal.fire("Erro!", "Ocorreu um erro ao tentar editar o local!","error");
    })
  }
  function removerLocal(id){
    api.delete(`/locaisReciclagem/${id}`).then(response=>{
      Swal.fire("Sucesso!", "Local removido com sucesso!","success");
      getPontos();
    }).catch(e=>{
      Swal.fire("Erro!", "Ocorreu um erro ao tentar remover o local!","error");
    })
  }
  function onClickBtnEdit(local){
    setLocal(local);
    setOpen(true);
  }
  function handleClose(){
    setLocal(initialStateLocal);
    setErrors([]);
    setOpen(false);
  }
  return (
    <div>
      <div className={`modalCadastroAndEdit ${open?'showModal':'hiddenModal'}`} onClick={handleClose}>
      </div>
        <div className={`modalContainer ${open?'showModal':'hiddenModal'}`}>
          <h2 className='titleModal'> <FaRecycle/> {`${local.id?'Editar':'Criar novo'} ponto de coleta`}</h2>
          <h4 className='subTitleModal'>Ponto de coleta</h4>
          <div className='inputsContainer'>
            <input type='text' className={`stdInput ${errors.indexOf('identificacao')!=-1?'inputError':''}`} placeholder='Identificação' onChange={handleChange} name='identificacao' value={local.identificacao}/>
            <input type='text' className={`stdInput ${errors.indexOf('capacidade')!=-1?'inputError':''}`} placeholder='Capacidade' onChange={handleChange} name='capacidade' value={local.capacidade}/>
          </div>
          <h4 className='subTitleModal'>Endereço</h4>
          <div className='inputsContainer'>
            <input type='text' className={`stdInput ${errors.indexOf('cep')!=-1?'inputError':''}`} placeholder='CEP' onChange={handleChange} name='cep' value={local.cep}/>
            <input type='text' className={`stdInput ${errors.indexOf('cidade')!=-1?'inputError':''}`} placeholder='Cidade' onChange={handleChange} name='cidade' value={local.cidade}/>
            <input type='text' className={`stdInput ${errors.indexOf('bairro')!=-1?'inputError':''}`} placeholder='Bairro' onChange={handleChange} name='bairro' value={local.bairro}/>
            <input type='text' className={`stdInput ${errors.indexOf('logradouro')!=-1?'inputError':''}`} placeholder='Logradouro' onChange={handleChange} name='logradouro' value={local.logradouro}/>
            <input type='text' className={`stdInput ${errors.indexOf('numeroEndereco')!=-1?'inputError':''}`} placeholder='Numero do endereço' onChange={handleChange} name='numeroEndereco' value={local.numeroEndereco}/>
            <input type='text' className={`stdInput ${errors.indexOf('complemento')!=-1?'inputError':''}`} placeholder='Complemento' onChange={handleChange} name='complemento' value={local.complemento}/>
          </div>
          <div className="btnsModal">
            <button className="stdBtn btnCancelar" onClick={handleClose}>CANCELAR</button>
            <button className="stdBtn btnConfirmar" onClick={handleSubmit}>CONFIRMAR</button>
          </div>
        </div>
      <button className=' btnAdd' onClick={()=>setOpen(true)}>+</button>
      <MapContainer center={localization} zoom={12} scrollWheelZoom={true} className={'map'}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locais.map((value, index) => {
          if (value.coordenadas) {
            return (
              <Marker key={index} icon={marker} position={value.coordenadas} >
                <StyledPop>
                  <div className={'dataContainer'}>
                    <h2>{value.identificacao}</h2>
                    <h4>Endereço:{loadEndereco(value)}</h4>
                    {value.cep && value.cep.length > 0 ? <h4>{`CEP: ${value.cep}`}</h4> : <></>}
                  </div>
                  <div className='containerBtns'>
                    <button className='stdBtn editButton' onClick={()=>onClickBtnEdit(value)}> <FaRegEdit /> Editar</button>
                    <button className='stdBtn removeButton' onClick={()=>removerLocal(value.localReciclagem_id)}><FaTrashAlt /> Remover</button>
                  </div>
                </StyledPop>
              </Marker>
            )
          }
        })}
      </MapContainer>
      
    </div>
  );
}

export default App;
