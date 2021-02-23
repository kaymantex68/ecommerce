import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductListItems from '../cards/ProductListItems'
import cat from "../../images/IMG_7923.JPG";
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { ShowAverage } from '../../functions/rating'

const { TabPane } = Tabs

// this is a children component of Product
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  return (
    <>
      <div className="col-md-7">

        {images && images.length ? (
          <Carousel shoeArrows={true} autoPlay infinitelLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={cat} className="mb-3 card-image" />}> </Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Other information ... xxx test test
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3"> {title} </h1>

        {/* something wrong ! check it!!! */}
        {product && product.ratings && (product.ratings.length > 0 )
        ? ShowAverage(product) 
        : <div className="text-center pt-1 pb-3">No rating</div>}

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
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={(newRating, name) => onStarClick(newRating, name)}
                // changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
