import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getProductsByCount } from '../../functions/product'
import AdminProductCard from '../../components/cards/AdminProductCard'

const AdminDashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                   <h4>Admin Dashboard</h4>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard