import React from 'react'
import { Container, Box, CircularProgress } from '@material-ui/core'
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
          special_price
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

function ProductDetail(props) {
    const url = props.props[0]
    
    
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
            <div className="row">
            <div className="col-md-6 text-center">
                <img src={product.image.url} width="30%"/>
            </div>
            <div className="col-md-6">
            <p dangerouslySetInnerHTML={{__html:product.description.html}} />
            <AddToCartBtn product={product}/>
            </div>
            </div>
        </Container>
    )}
    return(
        <div>Null</div>
    )
}

export default withApollo({ ssr: true })(ProductDetail);
