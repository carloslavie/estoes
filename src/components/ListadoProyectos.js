import React, { useEffect } from 'react';
import Proyectos from './Proyectos';
import { Box, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, } from '@chakra-ui/react';
import { obtenerProyectosApi } from '../reducers/proyectosReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

const Tah = styled.th`
    font-weight:500;
    color:#000;
    padding:1rem 1rem;

    @media (max-Width: 768px){
        color:red;
        display: none;        
    }
`;

const Linea = styled.div`
    @media (max-Width: 768px){
        border-bottom:1px solid #d9d9d9;
        margin:.5rem 0%;
        width: 100%;
    }
`;

const ContenedorTabla = styled.div`     
    max-width:1600;
    width:90%;
    margin: auto;
    padding: 2rem;

    @media (max-Width: 768px){
    width:100%;
    margin:1rem 0;
    padding: 0 1rem;
}
`;
    

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
                <Box 
                    display="flex"
                    justifyContent="space-between" 
                    width="80%" 
                    m="auto">
                    <Box>
                        <Box fontSize="20px" fontWeight="bold">My projects</Box>
                    </Box>
                    <Box>
                        <Button colorScheme="red" color="#fff" onClick={()=>history.push('/proyectos/nuevo')}>Add Project</Button>
                    </Box>
                </Box>
            </Box>
            <ContenedorTabla>
                
                    <Table variant="simple" textAlign="left" bg="#FFF">
                        <Thead backgroundColor="#fafafa" >
                            <Tr>
                            <Tah>Project info</Tah>
                            <Tah>Project Manager</Tah>
                            <Tah>Assigned to</Tah>
                            <Tah>Status</Tah>
                            <Tah>Action</Tah>
                            </Tr>
                        </Thead>
                        <Tbody>
                        { proyectos.length === 0 ? 'No existen proyectos que mostrar' : (
                            proyectos.map(proyecto => (
                                <>
                                <Proyectos 
                                    key={proyecto.id}
                                    proyecto={proyecto}
                                />
                                <Linea></Linea>
                                </>
                            ))
                        )}  
                        </Tbody>
                    </Table>
            
            </ContenedorTabla>
        </>
     );
}
 
export default ListadoProyectos;