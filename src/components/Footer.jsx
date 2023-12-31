import React from 'react'
import { Button, Container, Flex } from '../Globalstyles'
import { Footercard, StyledFooter } from './Footerstyles'
import Socialicons from './Socialicons'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
   <StyledFooter>
      <Container>
        < img src='./images/logo-white.svg' alt= ''/>

        <Flex>
            <ul style={{marginTop:'50px'}}>
                <li>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua</li>
                <li><img src='./images/icon-phone.svg' alt='' style={{marginRight:"3px"}}/>  +1-543-123-4567</li>
                <li> <img src='./images/icon-email.svg' alt='' style={{marginRight:"3px"}}/> example@huddle.com</li>
            </ul>
            <ul>
                <li>  About Us</li>
                <li>What We Do</li>
                <li> FAQ</li>  
            </ul>

            <ul>
                <li> Career</li>
                <li> Blog</li>
                <li>Contact Us </li>
            </ul>
            <Socialicons />
        </Flex>
        <p> &copy; Copyright 2023 Isaac C Anyim. All rights reserved.</p>
      </Container>
      <Footercard>
        <h2>
            Ready To DND?
        </h2>
        <Link to="/login"> <Button  bg>Get started for free</Button></Link>
      </Footercard>
     </StyledFooter>
  )
}

export default Footer