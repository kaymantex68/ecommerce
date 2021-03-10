import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from "../functions/user";
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = ({history}) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [totalAfterApplyCoupon, setTotalAfterApplyCoupon] = useState('')
    const [discountError, setDiscountError] = useState("")
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

    const removeAllFromCart = () => {
        if (typeof window !== "undefined") {
            // remove from localStorage
            localStorage.removeItem('cart')
            // remove from Redux
            dispatch({
                type: 'ADD_TO_CART',
                payload: []
            })
            // remove from DB
            emptyUserCart(user.token)
                .then(res => {
                    setProducts([])
                    setTotal(0)
                    setTotalAfterApplyCoupon(0)
                    setCoupon("")
                    toast.success('cart is empty')

                })

        }
    }

    const saveAddressToDB = () => {
        console.log(address)
        saveUserAddress(address, user.token)
            .then(res => {
                if (res.data.ok) {
                    setAddressSaved(true)
                    toast.success('Address saved')
                }
            })
    };

    const showAddress = () => {
        return (
            <>
                <ReactQuill theme="snow" value={address} onChange={setAddress} />
                <button
                    button
                    className="btn btn-primary mt-2"
                    onClick={saveAddressToDB}
                >
                    Save
                </button>
            </>
        )
    }

    const showApplyCoupon = () => {
        return (
            <>
                <input onChange={(e) => { setCoupon(e.target.value); setDiscountError('') }} value={coupon} className="form-control" type="text" />
                <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
            </>
        )
    }

    const applyDiscountCoupon = () => {
        console.log(coupon)
        applyCoupon(coupon, user.token)
            .then(res => {
                console.log('RES ON COUPON APPLY', res.data)
                if (res.data) {
                    setTotalAfterApplyCoupon(res.data)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    })
                }
                if (res.data.err) {
                    setDiscountError(res.data.err)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false
                    })
                }
            })
    }

    return (
        <div className="row p-3">
            <div className="col-md-6">
                <h4>Delivery address</h4>
                <br />
                <br />
                {showAddress()}
                <hr />
                <h4>Got a coupon?</h4>
                <br />
                {showApplyCoupon()}
                <br />
                {discountError && <p className="bg-danger p-2">{discountError}</p>}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p, i) => {
                    return (
                        <div key={i}>
                            <p>{p.product.title} ({p.color}) x {p.count} = {" "}
                                {p.product.price * p.count}
                            </p>
                        </div>
                    )
                })}
                <hr />
                <br />
                <p>Cart total: ${total}</p>
                {
                    totalAfterApplyCoupon > 0 &&
                    <p className="bg-success p-2">
                        {`Discount Aplied: Total Payable: ${totalAfterApplyCoupon}`}
                    </p>
                }
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <button
                            className="btn btn-primary"
                            disabled={!addressSaved || !products.length}
                            onClick={()=>history.push('/payment')}
                        >
                            Place order
                            </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            disabled={!products.length}
                            onClick={() => removeAllFromCart()}
                            className="btn btn-primary">Empty cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
