import React from 'react';
import ListadoProyectos from '../ListadoProyectos';
import logo from '../../assets/images/logo.png';
import { Box, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Contenedor = styled.div`
    background-color: #f0f2f5;
    width: 100%;
`;

const Header = () => {

    return ( 
        <>
        <Contenedor>
            <Box backgroundColor="#FFF" width= "100%" >                
                    
                    <Image p="2rem 3rem" src={logo} alt="logo"/> 
            </Box>
                
                    <ListadoProyectos/>
        </Contenedor>
        </>
     );

}
 
export default Header;