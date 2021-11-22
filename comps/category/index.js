import React from 'react'
import { useQuery,gql } from "@apollo/client";
import Link from 'next/link';
import { withApollo } from '../../lib/apollo/apolloClient';
import { Container, Grid, Card, CardMedia,CardActionArea,Typography, CardContent, CircularProgress, Box} from '@material-ui/core';

const CategoryProductList = gql`query getCategoryProduct($url_key: String!){
  categoryList(filters:{
    url_key: { eq: $url_key } }
  ){
    id
    image
    name
    url_key
    url_path
    products {
      items {
        name
        url_key
        price_range{
          maximum_price{
            regular_price{
              currency
              value
            }
          }
        }
        image{
          url
        }
      }
    }
  }
}`

function Category(props) {
  const url = props.props[0]
  
  if (url) {
    const response = useQuery(CategoryProductList,{
        variables:{
            url_key:url
        }
    })

    const {loading, error, data} = response;

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
    

    const products = data.categoryList[0].products.items
    console.log(data)
    
    return (
        <Container>
            <h2>Choose your style</h2>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={6} md={3} key={product.id}>
                  <Card>
                  <CardMedia component="img" height="100%" image={product.image.url} alt={product.name}/>
                  <CardContent>
                    <Typography align="center" variant="body1" color="secondary">
                      {product.name}
                    </Typography>
                    <Typography align="center" variant="body1">
                      <strong>IDR {product.price_range.maximum_price.regular_price.value} </strong>
                    </Typography>
                    <Link href="/[...slug]" as={`/${product.url_key}.html`}><a style={{textDecoration:'none', color:'#fff', background:'#557571', display: 'block', textAlign:'center', padding:'10px 20px', marginTop:'12px'}}>See Detail</a>
                  </Link>
                  </CardContent>
                  
                  </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )}
    return(
      <div>Null</div>
)
}

// export const getServerSideProps = async (context) => {
//     console.log(context)
//     const url = context.query
  
//     return {
//       props:{ slug: url }
//     }
//   }

export default withApollo({ ssr: true })(Category);
