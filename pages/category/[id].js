import Head from 'next/head';
import Link from 'next/link';
import { useQuery,gql } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from '../../lib/apollo/apolloClient';

const CategoryProductList = gql`query getCategoryProduct($category_id: String!){
    products(filter: { category_id: { eq: $category_id } }) {
        total_count
        items{
          id
          name
          brand
          url_key
          qty_available
          image{
            url
          }
        }
      }
}`

function CategoryProduct() {
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
            return <div className="container text-center"><div className="spinner-border text-warning" role="status" /><span><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"></a> Loading...</span>
            </div>
          }
        
          if (error) {
            console.error(error);
            return <h2>Error...</h2>;
          }

          const products = data.products.items

    return (
        <div>
            <Head>
                <title>Klambi | Category</title>
            </Head>

      <div className="container">
        <span className="badge bg-warning text-dark p-2">Category</span>
        <h2 className="mb-4">Choose your style</h2>
        <div className="row">
            {products.map((product) => (
              <div className="col-6" key={product.id}>
              <div className="card m-2" style={{maxWidth: '340px'}} key={product.id}>
                <img src={product.image.url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h3>{product.name}</h3>
                  <Link href={"/category"+"/product/"+product.url_key} key={product.id}>
                    <a className="btn btn-outline-dark w-100">See Detail</a>
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

    return(
            <div>Null</div>
    )
}

export default withApollo({ ssr: true })(CategoryProduct);
