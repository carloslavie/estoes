import React from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { Image, Box, Button, Tr, Td, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { obtenerProyectoActual, eliminarProyectoApi } from '../reducers/proyectosReducer';
import { useHistory } from 'react-router-dom';


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
            <Td>
                <Box>{name}</Box>
                <Box fontSize="10px">Creation date: {create}</Box>
            </Td>
            <Td><Flex alignItems="center"><Image src={avatar} width="30px" borderRadius="50%" mr="1rem"/>{productManager}</Flex></Td>
            <Td><Flex alignItems="center"><Image src={asigImage} width="30px" borderRadius="50%" mr="1rem"/>{assigned}</Flex></Td>
            <Td><Button>{status}</Button></Td>
            <Td>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<Icon as={AiOutlineMore} />}
                        variant="outline"
                        border="none"
                    />
                    <MenuList>
                        <MenuItem onClick={()=>handleEdit(proyecto)} icon={<EditIcon />}>
                        Edit
                        </MenuItem>
                        <MenuItem onClick={() => confirmDelete(id)} icon={<DeleteIcon />}>
                        Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Td>            
        </Tr> 
        </>
     );
}
 
export default Proyectos;