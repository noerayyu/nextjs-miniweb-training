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
            <button onClick={handleClick} className="btn btn-outline-dark w-100">Buy This</button>
        </div>
    )
}

export default AddToCartBtn
