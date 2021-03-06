import React from 'react'
import { Drawer, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import cat from '../../images/IMG_7923.JPG'

const SideDrawer = () => {
    const dispatch = useDispatch()
    const { drawer, cart } = useSelector(state => ({ ...state }))

    const imageStyle = {
        width: "100%",
        height: "50px",
        objectFit: "cover"
    }

    return <Drawer
        title={`CART/ ${cart.length} product`}
        placement="right"
        closable={false}
        onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            })
        }}
        visible={drawer}>
        {cart.map(p => {
            return (
                <div key={p._id} className="row">
                    <div className="col">
                        {
                            p.images[0]
                                ? (
                                    <>
                                        <img alt="cat" src={p.images[0].url} style={imageStyle} />
                                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                    </>
                                )
                                : (
                                    <>
                                        <image alt="cat" src={cat} style={imageStyle} />
                                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                    </>
                                )
                        }
                    </div>
                </div>
            )
        })}
        <Link to='/cart' >
            <button className="text-center btn btn-primary btn-raised btn-block" 
            onClick={() => dispatch({ type: "SET_VISIBLE", payload: false})}>
                Go To Cart
            </button>
        </Link>
    </Drawer>
}

export default SideDrawer