import React from 'react'
import Head from 'next/head';
import { makeStyles, Chip, Container, Box, CircularProgress, Grid, Typography } from '@material-ui/core'
import { useQuery,gql } from "@apollo/client";
import { withApollo } from '../../lib/apollo/apolloClient';
import AddToCartBtn from '../cart/AddToCartBtn';

const DetailProduct = gql`query getDetailProduct($url_key: String!){
    products(filter: { url_key: { eq: $url_key } }) {
        total_count
        items{
          id
          name
          brand
          price_range{
            maximum_price{
              regular_price{
                currency
                value
              }
            }
          }
          description{
            html
          }
          qty_available
          image{
            url
          }
        }
      }
}`

const useStyles = makeStyles({
  titleLabel:{
    marginTop:'24px',
    marginBottom:'24px'
  }
})

function ProductDetail(props) {
    const url = props.props[0]
    const classes = useStyles();
    
    if (url) {
        const response = useQuery(DetailProduct,{
            variables:{
                url_key:url
            }
        })
        const {loading, error, data} = response;
        console.log(loading);
        console.log(data);

        if (loading) {
            return <div><Container><Box sx={{ display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
              </Box>
            </Container></div>
          }
        
          if (error) {
            console.error(error);
            return <h2>Error...</h2>;
          }
        
          const product = data.products.items[0]
          console.log(product)

    return (
        <Container>
          <Head>
            <title>Klambi | {url}</title>
          </Head>

          <div className={classes.titleLabel}>
            <Chip label={url} color="secondary" />
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img src={product.image.url} width="60%"/>
            </Grid>
            <Grid item xs={12} md={6}>
              <h1>{product.name}</h1>
              <Typography variant="h4" color="secondary">
                IDR {product.price_range.maximum_price.regular_price.value}
              </Typography>
              <p dangerouslySetInnerHTML={{__html:product.description.html}} />
              <AddToCartBtn product={product}/>
            </Grid>
          </Grid>
        </Container>
    )}
    return(
        <div>Null</div>
    )
}

export default withApollo({ ssr: true })(ProductDetail);
