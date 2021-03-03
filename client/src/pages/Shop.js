import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox } from 'antd'
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons'
import { getCategories } from '../functions/category'
const { SubMenu, ItemGroup } = Menu

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])

    let dispatch = useDispatch()
    const { search } = useSelector(state => ({ ...state }))
    const { text } = search


    useEffect(() => {
        loadAllProducts()
        // fetch categories
        getCategories().then((res) => setCategories(res.data))
    }, [])

    // 1.load products by default on product page
    const loadAllProducts = () => {
        getProductsByCount(12).then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    }
    // 2.load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
        }, 300)
        return () => clearTimeout(delayed)

    }, [text])

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
            .then(res => {
                setProducts(res.data)
            }).catch(err=>console.log('catch err', err))
    }
    console.log(products)
    // 3. load products based on price range
    useEffect(() => {
        fetchProducts({ price })
    }, [ok])

    const handleSlider = (value) => {
        setPrice(value)
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        })
        setCategoryIds([])
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    const handleCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        })
        setPrice([0, 0])
        let inTheState = [...categoryIds]
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked)

        if (foundInTheState === -1) {
            inTheState.push(justChecked)
        } else {
            inTheState.splice(foundInTheState, 1)
        }

        setCategoryIds(inTheState)
        fetchProducts({ category: inTheState })
    }

    //4. load products based on category
    const showCategory = () =>
        categories.map((c) => (

            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 "
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >{c.name}</Checkbox>
            </div>
        ))



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4>Search/filter</h4>
                    <hr />
                    <Menu mode="inline" defaultOpenKeys={['1', '2']}>
                        {/* price */}
                        <SubMenu key="1" title={<span className="h6">
                            <DollarOutlined /> Price
                       </span>}>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={v => `$${v}`}
                                    range value={price}
                                    onChange={handleSlider}
                                    max="4999"

                                />
                            </div>
                        </SubMenu>
                        {/* categories */}
                        <SubMenu key="2" title={<span className="h6">
                            <DownSquareOutlined /> Categories
                       </span>}>
                            {showCategory()}
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-3">
                    {
                        loading
                            ? <h4 className="text-danger">Loading...</h4>
                            : <h4 className="text-danger">Products</h4>
                    }
                    {products.length < 1 && <p>No products found</p>}
                    <div className="row">
                        {products.map((p) => {
                            return <div key={p._id} className="col-md-4">
                                <ProductCard product={p} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop