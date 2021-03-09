import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DataPicker from "react-datepicker";
import {
    getCoupons,
    removeCoupons,
    createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.log("created coupon err", err));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Coupon</h4>
                    <form onSubmit={handleSubmit}>
                        <div slassName="form-group">
                            <label className="text-muted">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div slassName="form-group">
                            <label className="text-muted">Discount %</label>
                            <input
                                type="text"
                                className="form-control"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div slassName="form-group">
                            <label className="text-muted">Expiry</label>
                            <br />
                            <DataPicker
                                className="form-control"
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>
                        <br />
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
