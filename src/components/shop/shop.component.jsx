import React, {useState} from 'react'
import SHOP_DATA from './shop.data.jsx'
import CollectionPreview from '../preview-collection/preview-collection.component'

const ShopPage = () => {
    const [collections, setCollections] = useState(SHOP_DATA)


    return(
        <div className='shop-page'>
            {
                collections.filter((item, idx) => idx < 4).map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}

export default ShopPage