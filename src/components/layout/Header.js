import React from 'react';
import logo from '../../assets/images/logo.png';
import { Box, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom'

const Contenedor = styled.div`
    background-color: #f0f2f5;
    width: 100%;
`;

const Header = () => {

    return ( 
        <>
        <Contenedor>
            <Box backgroundColor="#FFF" width= "100%" >
                <Link to="/">                
                    <Image p="2rem 3rem" src={logo} alt="logo"/> 
                </Link>
            </Box>
                
                    
        </Contenedor>
        </>
     );

}
 
export default Header;