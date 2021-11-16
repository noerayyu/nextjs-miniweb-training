import React, {useState, useEffect} from 'react'

function cart() {
    const [myCart, setMyCart] = useState()
    useEffect(()=> {
        //logic for getting a local storage value
        const data = localStorage.getItem('my-cart')
        setMyCart(JSON.parse(data))
      },[])

      console.log(myCart)
      
    return (
        <div className="container">
            <div className="row align-items-center">
            {myCart && myCart.products.map((item) => (
                <>
                <div className="col-6" key={item.productId}>
                <img className="mb-4" src={item.image} width={200} />
                <p>{item.name}</p>
                </div>
                <div className="col-6">
                <p><strong>qty: </strong>{item.qty}</p>
                <p><strong>price: </strong>Rp {item.price}</p>
                <p><strong>total price: </strong>Rp {item.totalPrice}</p>
                </div>
                </>
            ))}
            </div>
        </div>
    )
}

export default cart
