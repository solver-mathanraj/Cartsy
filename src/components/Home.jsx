import React from 'react'
import Header from './Header.jsx'
import AutoCarousel from './AutoCarousel'
import ProductDisplay from './ProductDisplay.jsx'


const Home = () => {
  return (
   <div>
    <Header />
    <AutoCarousel/>
    <ProductDisplay/>
   </div>
  )
}

export default Home