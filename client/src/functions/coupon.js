import axios from 'axios'

export const createCoupon = async (coupon, authtoken) => {
    return axios.post(`${process.env.REACT_APP_API}/coupon`,
    {...coupon},
    {headers: {
        authtoken
    }})
}

export const getCoupons = async () => {
    return axios.get(`${process.env.REACT_APP_API}/coupons`)
}

export const removeCoupons = async (couponId, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`,
    {headers: {
        authtoken
    }})
}