import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import cat from "../../images/IMG_7923.JPG";
import { ShowAverage } from '../../functions/rating'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

const ProductCard = ({ product }) => {
    const { title, description, images, slug, price } = product
    const [toolTip, setToolTip] = useState('click to add')
    // redux
    const {user, cart}=useSelector(state=>({...state}))
    const dispatch= useDispatch()


    const handleAddToCart = () => {
        // create cart array
        
        let cart = []
        if (typeof window !== undefined) {
            // if cart in localStorage, get cart
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1
            })
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual)
            // save to localStorage
            localStorage.setItem('cart', JSON.stringify(unique))
            setToolTip('added')
            // add to redux
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            })
            // show cart drawers
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            })
        }
    }

    return (
        <>

            {
                product && product.ratings && (product.ratings.length > 0)
                    ? ShowAverage(product)
                    : <div className="text-center pt-1 pb-3">No rating</div>
            }

            <Card
                cover={
                    <img
                        src={images && images.length ? images[0].url : cat}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View product
                    </Link>,
                    <Tooltip title={toolTip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined
                                className="text-danger"
                            /> <br /> Add to cart
                        </a>
                    </Tooltip>
                ]}
            >
                <Card.Meta
                    title={`${title} - $${price}`}
                    description={`${description && description.substring(0, 10)}...`}
                />
            </Card>
        </>
    );
};

export default ProductCard;
