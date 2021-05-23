import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { Image, Box, Button, Tr, Td, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { obtenerProyectoActual, eliminarProyectoApi } from '../reducers/proyectosReducer';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled'


const Tad = styled.td`

@media (max-width: 768px){
    display: flex;
}
`;

const CampoUno = styled.div`
    padding-left: 1rem;
    @media (max-width: 768px){
        display: flex;
        flex-direction:column;
        padding-left: 0;
        margin-left: 0;
    }
`;

const ProjectM = styled.td`
    display:flex;
    align-items: center;
    @media (max-width: 768px){
        display:none
    }
`;

const TadStatus = styled.td`
    @media (max-width: 768px){
        display:none
    }
`;

const TadMenu = styled.td`    
    @media (max-width: 768px){
        float: inline-end;
    }
`;

const Proyectos = ({proyecto}) => {

    const { name, avatar, productManager, assigned, status, asigImage, id, create } = proyecto;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDelete = id =>{
  
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un testimonio que se elimina no se puede volver a recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9AC9FB',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch('API', {
                method: 'DELETE',
                });
                dispatch(eliminarProyectoApi(id));
            }
            })
    }

     const handleEdit = proyecto => {
     dispatch(obtenerProyectoActual(proyecto))
     console.log(proyecto)
     history.push(`/proyectos/editar/${id}`);
   }

    return ( 
        <>        
        <Tr>
            <Tad>
                <CampoUno>
                    <Box>{name}</Box>
                    <Box fontSize="10px">Creation date: {create}</Box>
                </CampoUno>
            </Tad>
            <ProjectM><Image src={avatar} width="30px" borderRadius="50%" mr="1rem"/>{productManager}</ProjectM>
            <Tad><Flex alignItems="center"><Image src={asigImage} width="30px" borderRadius="50%" mr="1rem"/>{assigned}</Flex></Tad>
            <TadStatus><Button>{status}</Button></TadStatus>
            <TadMenu>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<Icon as={AiOutlineMore} />}
                        variant="outline"
                        border="none"
                        fontSize={{ base: "40px", md: "30px", lg: "26px" }}
                    />
                    <MenuList>
                        <MenuItem onClick={()=> handleEdit(proyecto)} icon={<EditIcon />}>
                        Edit
                        </MenuItem>
                        <MenuItem onClick={() => confirmDelete(id)} icon={<DeleteIcon />}>
                        Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </TadMenu>            
        </Tr> 
        </>
     );
}
 
export default Proyectos;