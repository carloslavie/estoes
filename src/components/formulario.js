import React, { useState, useEffect } from 'react';
import {
    FormControl, FormLabel, Input, Container, Button, Select } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { actualizarProyectoApi, agregarProyectosApi } from '../reducers/proyectosReducer';
import { useDispatch, useSelector } from 'react-redux';


const Formulario = ({proyecto}) => {
    console.log(proyecto)
    const dispatch = useDispatch();
        
    const proyectos = useSelector(state=> state.proyectos)
    

    const history = useHistory();

    const [newProyecto, setNewProyecto] = useState({
        name:'',
        productManager:'',
        assigned:'',
        status:'', 
        description:'',
        id:''        
        });  
            
    const { name, productManager, description, assigned, status, id } = newProyecto;
  
  useEffect(() => {
        
    if(proyecto){
        setNewProyecto(proyecto)        
    }
         
  }, [])  

    const handleChange = e => {
       
        setNewProyecto({
            ...newProyecto,
            [e.target.name] : e.target.value
            
        })
    }

    const handleCreate = e => {
        e.preventDefault()

        dispatch(agregarProyectosApi(newProyecto));
        history.push('/');
    }

    const handleEdit = e => {
        e.preventDefault()
        dispatch(actualizarProyectoApi(newProyecto));
        
        history.push('/');
    } 
    
    return ( 
        <>
        { proyecto ? <h1>Edit Project</h1> : <h1>Add Project</h1>}
        <Container maxW="container.sm" mt="3rem" border="1px" borderRadius="2xl" p="1rem" borderColor="#e2e8f0" width="95%">
            <FormControl id="name" mb="1rem">
                <FormLabel>Project name</FormLabel>
                    <Input 
                        type="text"
                        name= "name"
                        onChange={handleChange}
                        value={name}
                        required
                    />               
            </FormControl>
            <FormControl id="description" mb="1rem">
                <FormLabel>Description</FormLabel>
                    <Input 
                        type="text"
                        name= "description"
                        onChange={handleChange}
                        value={description}
                        required
                    />               
            </FormControl>
            <FormControl id="productManager" mb="1rem">
                <FormLabel>Project Manager</FormLabel>
                <Select placeholder="Select option"
                        name="productManager"
                        onChange={handleChange}  
                >
                        {proyectos.proyectos.map(proyect => (
                            <option key={proyect.id} name="productManager" value="proyect.productManager">{proyect.productManager}</option>
                        ))}                 
                </Select>    
            </FormControl>
            <FormControl id="assigned" mb="1rem">
                <FormLabel>Assigned to</FormLabel>
                <Select placeholder="Select option"
                        onChange={handleChange} 
                        name="assigned" 
                >
                        {proyectos.proyectos.map(proyect => (
                            <option key={proyect.id} name="assigned" value="proyect.productManager">{proyect.assigned}</option>
                        ))}                 
                </Select>    
            </FormControl>
            <FormControl id="status" mb="1rem">
                <FormLabel>Status</FormLabel>
                <Select placeholder="Select option"
                        onChange={handleChange} 
                        name="status" 
                >
                        <option value="status">Enable</option>
                        <option value="status">Disable</option>               
                </Select>    
            </FormControl>
            
            
                
            { proyecto ? 
                <Button
                    mt={4}
                    colorScheme="red"                
                    type="submit"                    
                    onClick={handleEdit}
                >Save changes
                </Button> :
                
                <Button
                    mt={4}
                    colorScheme="red"                
                    type="submit"
                    onClick={handleCreate}
                >Create Project
                </Button>
                }
        </Container>
        </>
        
     );
}
 
export default Formulario;