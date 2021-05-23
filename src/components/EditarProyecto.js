import React from 'react';
import Formulario from './Formulario';
import { useSelector } from 'react-redux';

const EditarProyecto = () => {  
    
    const proyecto = useSelector( state => state.proyectos.proyecto ); 
    
    return ( 
        <Formulario
            proyecto = {proyecto}
        />
     );
}
 
export default EditarProyecto;