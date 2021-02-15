import React from 'react'
import { Card } from 'antd'
import cat from '../../images/IMG_7923.JPG'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Meta } = Card
const AdminProductCard = ({ product }) => {
    const { title, description, images } = product
    return (
        <div>
            <Card cover={
                <img
                    src={images && images.length ? images[0].url : cat}
                    style={{ height: '150px', objectFit: 'cover' }}
                    className="p-1"
                />
            }
                actions={[<EditOutlined className="text-warning"/>,<DeleteOutlined className="text-danger"/>]}
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