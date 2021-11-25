import React, {useState, useEffect} from 'react'
import Head from 'next/head';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper} from '@material-ui/core';

function cart() {
    const [myCart, setMyCart] = useState()
    useEffect(()=> {
        //logic for getting a local storage value
        const data = localStorage.getItem('my-cart')
        setMyCart(JSON.parse(data))
      },[])
    return (
        <div style={{margin:'20px auto'}}>
        <Container>
            <Head>
            <title>Klambi | My Cart</title>
            </Head>
            <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 300, }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myCart && myCart.products.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>
                  <img src={item.image} width="80px"/>
                  <p>{item.name}</p>
              </TableCell>
              <TableCell align="right">{item.qty}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.totalPrice}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}><strong>Total</strong></TableCell>
            <TableCell align="right">{myCart && myCart.totalProductsPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
        </div>
    )
}

export default cart
