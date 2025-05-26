import React from 'react'
import HeaderDisplay from '../components/custom/HeaderDisplay'
import FilterMenu from '../components/custom/FilterMenu'
import ProductList from '../components/custom/ProductList'


const Home = () => {
  return (
    <div >
    <HeaderDisplay/>
    <FilterMenu/>
    <ProductList/>
    </div>
  )
}

export default Home