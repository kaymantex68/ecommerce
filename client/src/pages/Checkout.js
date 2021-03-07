import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../functions/user";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setLoading(true);
        getUserCart(user.token)
            .then((res) => {
                console.log(JSON.stringify(res.data, null, 4));
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error -----> ", err);
                setLoading(false);
            });
    }, []);

    const saveAddressToDB = () => { };

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery address</h4>
                <br />
                <br />
                textarrea
                <button
                    button
                    className="btn btn-primary mt-2"
                    onClick={saveAddressToDB}
                >
                    Save
                </button>
                <hr />
                <h4>Got a coupon?</h4>
                <br />
                input and apply coupon
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr/>
                <p>Products {products.length}</p>
                <hr />
                {products.map((p,i)=>{
                    return (
                        <div key={i}>
                            <p>{p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}
                            </p>
                        </div>
                    )
                })}
               <hr/>
                <br />
                <p>Cart total: ${total}</p>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">Place order</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary">Empty cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
