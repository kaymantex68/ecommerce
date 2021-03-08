import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import DataPicker from 'react-datepicker'
import { getCoupons, removeCoupons, createCoupon } from '../../../functions/coupon'
import { DeleteOutlined, } from '@ant-design/icons'
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from '../../../components/nav/AdminNav'

const CreateCouponPage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Coupon</h4>
                </div>
            </div>
        </div>

    )
}

export default CreateCouponPage