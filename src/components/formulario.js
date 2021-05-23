import React, { useState, useEffect } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Container, Button, Select } from "@chakra-ui/react";
import { useHistory, Link } from 'react-router-dom';
import { actualizarProyectoApi, agregarProyectosApi } from '../reducers/proyectosReducer';
import { useDispatch, useSelector } from 'react-redux';


const Formulario = ({proyecto}) => {
    
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

    const [ error, actualizarError ] = useState(false)
  
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

        if(name.trim() === "" || productManager.trim() === "" || assigned.trim() === "" || status.trim() === "" ){
            actualizarError(true);
            setTimeout(() => {
                actualizarError(false)
            }, 1000);
            return;
        }
        
        actualizarError(false)

        dispatch(agregarProyectosApi(newProyecto));
        console.log(newProyecto)
        history.push('/');
    }

    const handleEdit = e => {
        e.preventDefault()

        if(name.trim() === "" || productManager.trim() === "" || assigned.trim() === "" || status.trim() === "" ){
            actualizarError(true);
            setTimeout(() => {
                actualizarError(false)
            }, 1000);
            return;
        }
        
        actualizarError(false)

        dispatch(actualizarProyectoApi(newProyecto));        
        history.push('/');
    } 
    
    return ( 
        <>
        
        { proyecto ? 
        <Flex alignItems="center" ml="3rem"> 
            <Link to="/">
                <Box>&#8701; Back</Box>
            </Link>
            <Box fontSize="2rem" fontWeight="semibold" ml="1rem" > Edit Project
            </Box>
        </Flex>
         : <Flex alignItems="center" ml="3rem"> 
         <Link to="/">
             <Box>&#8701; Back</Box>
         </Link>
         <Box fontSize="2rem" fontWeight="semibold" ml="1rem" > Add Project
         </Box>
     </Flex>
        }
        <Container maxW="container.sm" mt="3rem" border="1px" borderRadius="2xl" p="1rem" borderColor="#e2e8f0" width="95%">
            <FormControl id="name" mb="1rem">
                <FormLabel>Project name</FormLabel>
                    <Input 
                        type="text"
                        name= "name"
                        onChange={handleChange}
                        value={name}
                        isrequired
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
                            <option key={proyect.id} name="productManager" value={proyect.productManager}>{proyect.productManager}</option>
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
                            <option key={proyect.id} name="assigned" value={proyect.assigned}>{proyect.assigned}</option>
                        ))}                 
                </Select>    
            </FormControl>
            <FormControl id="status" mb="1rem">
                <FormLabel>Status</FormLabel>
                <Select placeholder="Select option"
                        onChange={handleChange} 
                        name="status" 
                >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>               
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
        {error && <Box backgroundColor="red" color="#FFF" width="30%" m="1rem auto" fontWeight="semibold" borderRadius="1rem" textAlign="center"> LOS CAMPOS SON OBLIGATORIOS </Box>}
        </>
        
     );
}
 
export default Formulario;