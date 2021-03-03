import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import cat from "../../images/IMG_7923.JPG";
import { ShowAverage } from '../../functions/rating'


const ProductCard = ({ product }) => {
    const { title, description, images, slug, price } = product
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
                    <>
                        <ShoppingCartOutlined
                            className="text-danger"
                        // onClick={() => handleRemove(slug)}
                        /> <br /> Add to cart
                </>,
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
