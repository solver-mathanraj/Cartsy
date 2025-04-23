import React from 'react'
import Header from './Header.jsx'
import AutoCarousel from './AutoCarousel'
import ProductDisplay from './ProductDisplay.jsx'
import Footer from './Footer.jsx'


const Home = () => {
  return (
   <div>
    <Header />
    <AutoCarousel/>
    <ProductDisplay/>
    <Footer/>
   </div>
  )
}

export default Home