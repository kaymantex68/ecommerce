import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'

const Cart = () => {
    // from redux
    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const getTotal = () => {
        return cart.reduce((a, b) => { return a + b.count * b.price }, 0)
    }

    const saveOrderToDb = () => {
        // to di later
    }

    const showCartItems = () => {
        return (
            <table className="table table-boarder">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {cart.map(p=>(
                    <ProductCardInCheckout key={p._id} p={p}/>
                ))}
            </table>
        )
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h5>Cart/ {cart.length} product</h5>
                    {!cart.length
                        ? <h6>No products.<Link to="/shop">Continue shopping </Link></h6>
                        : showCartItems()}
                </div>
                <div className="col-md-4">
                    <h5>Order Summary</h5>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, index) => {
                        return (
                            <div key={index}>
                                <p>{c.title} x {c.count}= ${c.price * c.count}</p>
                            </div>
                        )
                    })}
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user
                            ? (<button onClick={saveOrderToDb} disabled={!cart.length} className="btn btn-sm btn-primary mt-2">Procecces to checkout</button>)
                            : (<button className="btn btn-sm btn-primary mt-2">
                                <Link to={{
                                    pathname: "/login",
                                    state: { from: "cart" }
                                }}>Login to checkout</Link>
                            </button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart