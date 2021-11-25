import React, {useContext} from 'react'
import { addNewProduct, updateCart } from './BtnFuction';
import { AppContext } from '../context/AppContext';

const AddToCartBtn = (props) => {
    const {product} = props;
    const [cart, setCart] = useContext(AppContext);

    const handleClick = () => {
        if (process.browser) {
            let previousCart = localStorage.getItem("my-cart")

            if(previousCart) {
                previousCart = JSON.parse(previousCart);
                const qtyToBeAdded = 1;

                const updatedCart = updateCart(previousCart, product, qtyToBeAdded);
            } else {
                const newCart = addNewProduct(product);
                setCart(newCart)
            }
        }
    }

    return (
        <div>
            <a onClick={handleClick} style={{textDecoration:'none', color:'#fff', background:'#557571', display: 'block', textAlign:'center', padding:'10px 20px', marginTop:'12px'}}>ADD TO CART</a>
        </div>
    )
}

export default AddToCartBtn
