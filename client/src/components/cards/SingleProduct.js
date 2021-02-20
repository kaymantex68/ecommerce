import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import cat from "../../images/IMG_7923.JPG";
const { Meta } = Card;

const SingleProduct = ({ product }) => {
    const { title, description, images, slug } = product;
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel shoeArrows={true} autoPlay infinitelLoop>
                        {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    </Carousel>
                ) : (
                        <Card
                            cover={
                                <img
                                    src={cat}
                                    className="mb-3 card-image"
                                />
                            }
                        ></Card>
                    )}
            </div>
            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="class-succes" /> <br />
              Add to cart
            </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                    <p>
                        /price/category/subs/shiping/color/brand/quantity available/sold
          </p>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
