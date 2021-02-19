import React, { useState, useEffect } from 'react'
import { getProducts } from '../../functions/product'
import ProductCard from '../cards/ProductCard'


const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts('sold', 'desc', 3)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    return (
        <>
            <div className="conteiner">
                <div className="row p-5">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default BestSellers;