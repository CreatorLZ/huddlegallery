import React from 'react'
import Header from '../components/Header'
import { Container } from '../Globalstyles'
// import Header from './components/Header'
import content from '../Content'
// import { Container } from '../Globalstyles'
import Card from '../components/Card'
import Footer from '../components/Footer'


const Homepage = () => {
  return (
    <>
    <Header/>
    <Container style={{padding:"90px 20px"}}>
    {content.map((item , index) => (
        <Card key={index} item={item}/>
    ))}
    </Container>
    <Footer />
    </>
  )
}

export default Homepage