import React from "react";
import {useNavigate, redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../../Api"
import { Navigate } from "react-router-dom";




function Authadm({children}){ 
var valida =''

if(sessionStorage.getItem('permissao')){
  valida=(sessionStorage.getItem('permissao'))
  
  if(valida == 'ADM'){return children}

}



  return <Navigate to="/"/>

 
    
}

export default Authadm;