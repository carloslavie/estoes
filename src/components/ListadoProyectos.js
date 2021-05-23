import React, { useEffect } from 'react';
import Proyectos from './Proyectos';
import { Box, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, } from '@chakra-ui/react';
import { obtenerProyectosApi } from '../reducers/proyectosReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
    

const ListadoProyectos = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { proyectos } = useSelector(state => state.proyectos);

    useEffect(() => {

        dispatch(obtenerProyectosApi())

    }, [])
    
        

    return ( 
        <>
            <Box  mt="0" mb="2rem" pt="1rem" pb="1rem" bg="#FFF" border="1px" borderColor="#d9d9d9">
                <Box display="flex" justifyContent="space-between" width="80%" m="auto">
                    <Box>
                        <Box fontSize="20px" fontWeight="bold">My projects</Box>
                    </Box>
                    <Box>
                        <Button colorScheme="red" color="#fff" onClick={()=>history.push('/proyectos/nuevo')}>Add Project</Button>
                    </Box>
                </Box>
            </Box>
        <Box className="contenedor" maxWidth="1600" width="90%" m="auto" p="2rem">
            
                <Table variant="simple" textAlign="left" bg="#FFF">
                    <Thead backgroundColor="#fafafa" >
                        <Tr>
                        <Th fontWeight="700" color="#000">Project info</Th>
                        <Th fontWeight="700" color="#000">Project Manager</Th>
                        <Th fontWeight="700" color="#000">Assigned to</Th>
                        <Th fontWeight="700" color="#000">Status</Th>
                        <Th fontWeight="700" color="#000">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    { proyectos.length === 0 ? 'No existen proyectos que mostrar' : (
                                        proyectos.map(proyecto => (
                                            <Proyectos 
                                                key={proyecto.id}
                                                proyecto={proyecto}
                                            />
                                        ))
                                    )}  
                    </Tbody>
                </Table>
           
        </Box>
        </>
     );
}
 
export default ListadoProyectos;