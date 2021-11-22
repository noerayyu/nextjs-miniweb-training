import Head from 'next/head';
import Link from 'next/link';
import { useQuery,gql } from "@apollo/client";
import { Container, Grid, Paper, makeStyles, Chip, Box, CircularProgress } from '@material-ui/core';

import { withApollo } from '../lib/apollo/apolloClient';
import CardCategory from '../comps/CardCategory';

const useStyles = makeStyles({
  titleLabel:{
    marginTop:'24px',
    marginBottom:'24px'
  }
})

const CategoryList = gql`{
    categoryList{
      id
      image
      name
      url_key
      url_path
      children{
        id
        name
        url_key
        url_path
        image
      }
    }
}`


const Home= () => {
  const classes = useStyles();
  const response = useQuery(CategoryList);
  const {loading, error, data} = response;

  if (loading) {
    return <div className={classes.titleLabel}><Container><Box sx={{ display: 'flex', justifyContent: 'center'}}>
    <CircularProgress />
    </Box>
  </Container></div>
  }

  if (error) {
    console.error(error);
    return <h2>Error...</h2>;
  }

  const categories = data.categoryList[0]

  return (
    <Container>
      <Head>
        <title>Klambi | Home</title>
      </Head>
      <div className={classes.titleLabel}>
      <Chip label="All Categories" color="secondary" />
      </div>
      <Grid container spacing={3}>
        {categories.children.map((category) => (
          <Grid item xs={6} md={3} key={category.id}>
            <Paper>
            <CardCategory category={category} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default withApollo({ ssr: false })(Home);