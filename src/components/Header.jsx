import { Image, Styledheader } from './Headerstyles'
import React from 'react'
import { Button, Container, Flex, Logo, Nav } from '../Globalstyles'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <Styledheader>
    <Container>
      <Nav>
          <Logo src='./images/logo.svg' alt='logo'/>
          <Link to="/login"> <Button  color>Try It Free</Button></Link>
      </Nav>
      <Flex>
        <div>
            <h1 style={{marginBottom:"20px"}}>
            Where Creativity<br/> Knows No Bounds  
            </h1>
            <p style={{marginBottom:"20px"}}>
            Explore a world of visual creativity with our image gallery. Drag and drop your images to curate your own unique gallery experience. Your creativity, your gallery, your way.
            </p>
            <Link to="/login"> <Button bg>Get Started For Free</Button></Link>
        </div>
        <Image src='./images/illustration-mockups.svg' alt='' style={{flex:"1"}}/>
      </Flex>
    </Container>
    </Styledheader>
  )
}

export default Header