import React from 'react'

const Checkout = () => {

    const saveAddressToDB = () => {

    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery address</h4>
                <br />
                <br />
                textarrea
                <button className="btn btn-primary mt-2" onClick={saveAddressToDB}>Save</button>
                <hr/>
                <h4>Got a coupon?</h4>
                <br/>
                input and apply coupon
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <br/>
                <p>Product x</p>
                <br/>
                <p>List of products</p>
                <br/>
                <p>Cart total: $x</p>
                <br/>

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
    )
}

export default Checkout