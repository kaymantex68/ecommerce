import React from 'react'
import { Card } from 'antd'
import cat from '../../images/IMG_7923.JPG'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { Meta } = Card
const AdminProductCard = ({ product, handleRemove }) => {
    const { title, description, images, slug } = product
    // console.log(slug)
    return (
        <div>
            <Card cover={
                <img
                    src={images && images.length ? images[0].url : cat}
                    style={{ height: '150px', objectFit: 'cover' }}
                    className="p-1"
                />
            }
           
                actions={[
                    <Link to={`/admin/product/${slug}`}>
                        <EditOutlined className="text-warning" />
                    </Link>,
                    <DeleteOutlined className="text-danger" onClick={() => handleRemove(slug)} />
                ]}
            >
                <Meta
                    title={title}
                    description={`${description && description.substring(0, 10)}...`}
                />
            </Card>
        </div>
    )
}

export default AdminProductCard