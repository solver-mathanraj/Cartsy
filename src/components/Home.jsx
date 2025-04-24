import React from 'react'
import Header from './Header.jsx'

import ProductDisplay from './ProductDisplay.jsx'
import Footer from './Footer.jsx'


const Home = () => {
  return (
   <div>
    <Header />
   
    <ProductDisplay/>
    <Footer/>
   </div>
  )
}

export default Home