import React from "react";
import {useNavigate, redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../../Api"
import { Navigate } from "react-router-dom";




function Auth({children}){
if(localStorage.getItem('token')){
  return children
}
   
  return <Navigate to="/"/>

 
    
}

export default Auth;