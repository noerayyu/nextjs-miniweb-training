import Head from 'next/head';
import Link from 'next/link';
import { useQuery,gql } from "@apollo/client";
import { useRouter } from "next/router";
import { makeStyles, Container, Chip, Grid, CircularProgress, Card, CardMedia, CardContent, Typography, Box, CardActionArea} from '@material-ui/core';

import { withApollo } from '../../lib/apollo/apolloClient';

const CategoryProductList = gql`query getCategoryProduct($category_id: String!){
    products(filter: { category_id: { eq: $category_id } }) {
        total_count
        items{
          id
          name
          special_price
          brand
          url_key
          qty_available
          image{
            url
          }
        }
      }
}`

const useStyles =  makeStyles({
  page:{
    marginTop:'24px'
  },
  titleLabel:{
    marginBottom:'24px'
  }
})

function CategoryProduct() {
  const classes = useStyles();
    const router = useRouter();
    const id = router.query.id;

    if (id) {
        const response = useQuery(CategoryProductList,{
            variables:{
                category_id:id
            }
        })
        const {loading, error, data} = response;
        console.log(loading);
        console.log(data);

        if (loading) {
            return <div className={classes.page}><Container><Box sx={{ display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
              </Box>
            </Container></div>
          }
        
          if (error) {
            console.error(error);
            return <h2>Error...</h2>;
          }

          const products = data.products.items

    return (
      <div className={classes.page}>
      <Container>
        <Head>
          <title>Klambi | Category</title>
        </Head>
        <div className={classes.titleLabel}>
        <Chip label="Product Category" color="secondary"/>
        </div>
        <h2>Choose your style</h2>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={6} md={3} key={product.id}>
                  <Card>
                  <CardActionArea>
                  <CardMedia component="img" height="100%" image={product.image.url} alt={product.name}/>
                  <CardContent>
                    <Typography align="center" variant="body1" color="secondary">
                      {product.name}
                    </Typography>
                    <Typography align="center" variant="body1">
                      <strong>IDR {product.special_price}</strong>
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  </Card>
              </Grid>
            ))}
          </Grid>
      </Container>
      </div>
    )
    }

    return(
            <div>Null</div>
    )
}

export default withApollo({ ssr: true })(CategoryProduct);
