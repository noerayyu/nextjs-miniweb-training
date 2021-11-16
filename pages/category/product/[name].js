import Head from 'next/head';
import { useQuery,gql } from "@apollo/client";
import { useRouter } from "next/router";
import AddToCartBtn from '../../../comps/cart/AddToCartBtn';

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

function ProductDetail() {
    const router = useRouter();
    const name = router.query.name;

    if (name) {
        const response = useQuery(DetailProduct,{
            variables:{
                url_key:name
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
                <title>Klambi | Product</title>
            </Head>

      <div className="container">
        <div className="row">
            {products.map((product) => (
              <div key={product.id} className="row align-items-center mb-4">
              <div className="col-lg-6 col-12">
                  <span className="badge bg-warning text-dark p-2">{product.brand}</span>
                  <h1 className="mb-4">{product.name}</h1>
                  <img className="mb-4" src={product.image.url} width={400}/>
              </div>
              <div className="col-lg-6 col-12">
                  <h2>Rp {product.special_price}</h2>
                  <p dangerouslySetInnerHTML={{__html:product.description.html}} />
                  <AddToCartBtn product={product} />
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

export default ProductDetail
