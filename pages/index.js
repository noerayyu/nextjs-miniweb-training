import Head from 'next/head';
import Link from 'next/link';
import { useQuery,gql } from "@apollo/client";
import { withApollo } from '../lib/apollo/apolloClient';


const CategoryList = gql`{
    categoryList(filters:{}){
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
      }
    }
}`


const Home= () => {
  const response = useQuery(CategoryList);
  console.log(response);
  const {loading, error, data} = response;
  console.log(loading);
  console.log(data);

  if (loading) {
    return <div className="container text-center"><div className="spinner-border text-warning" role="status" /><span><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"></a> Loading...</span>
    </div>
  }

  if (error) {
    console.error(error);
    return <h2>Error...</h2>;
  }

  const categories = data.categoryList
  return (
    <div>
      <Head>
        <title>Klambi | Home</title>
      </Head>

      <div className="container">
        <span className="badge bg-warning text-dark p-2">All Categories</span>
        <h2 className="mb-4">New Fashion</h2>
        <div className="row">
            {categories.map((category) => (
              <div className="col-6"  key={category.id}>
                <div className="card m-2" key={category.id}>
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <Link href={"/category/"+category.id}>
                  <a className="btn btn-outline-dark">See More</a>
                  </Link>
                </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default withApollo({ ssr: true })(Home);