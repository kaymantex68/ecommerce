import React from 'react'
import ModalImage from 'react-modal-image'
import cat from '../../images/IMG_7923.JPG'
import { useDispatch } from 'react-redux'

const ProductCardInCheckout = ({ p }) => {
    const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']

    const dispatch = useDispatch()

    const handleColorChange = (e) => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value
                }
            })
            // console.log('cart update color', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count
                }
            })
            // console.log('cart update color', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "80px", height: "auto" }}>
                        {p.images.length
                            ? <ModalImage small={p.images[0].url} large={p.images[0].url} />
                            : <ModalImage small={cat} large={cat} />}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={(e) => { handleColorChange(e) }} name="color" id="" className="form-control">
                        {
                            p.color
                                ? <option value={p.color}>{p.color}</option>
                                : <option>Select</option>
                        }
                        {colors.filter((c) => c !== p.color).map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </td>
                <td className="text-center">
                    <input type="number" className="form-control" value={p.count} onChange={handleQuantityChange} />
                </td>
                <td>Shipping Icon</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout