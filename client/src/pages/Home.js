import React, { useState, useEffect } from 'react'
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(4)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
  }

  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        {/* {loading ? <h4 className="text-danger">Loading...</h4> : <h4>All Product</h4>} */}
        <Jumbotron text={['New Arrivals...','New Products...']} />
      </div>

      <div className="conteiner">
        <div className="row p-5">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


export default Home;