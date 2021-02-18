import React from "react";
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import cat from "../../images/IMG_7923.JPG";


const ProductCard = ({ product }) => {
    const { title, description, images, slug } = product
    return (
        <>
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : cat}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1"
                />
            }
            actions={[
                <Link to={`/admin/product/${slug}`}>
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
                title={title}
                description={`${description && description.substring(0, 10)}...`}
            />
        </Card>
        </>
    );
};

export default ProductCard;
