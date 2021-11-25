import React from 'react'
import { useQuery,gql } from "@apollo/client";

import Category from '../comps/category';
import { withApollo } from '../lib/apollo/apolloClient';
import ProductDetail from '../comps/product';

const UrlResolver = gql`query getUrlResolver($url: String!){
    urlResolver(url: $url){
        canonical_url
        entity_uid
        id
        redirectCode
        relative_url
        type
    }
}`

const getPage = (resolver, NewSlug) => {
    if (!resolver) {
      return <div>Page not found</div>;
    } else if (resolver.type === "CATEGORY") {
      return <Category props={NewSlug} />;
    } 
    else if (resolver.type === "PRODUCT") {
      return <ProductDetail props={NewSlug} />;
    }
    return <span />;
  };

function DynamicPage({props}) {
    // const { query } = slug;
    console.log(props)
    let url = ''
    let NewSlug = [];
    props.slug.map((value) => {
        value = value.replace(".html", "");
        NewSlug.push(value);//masukin value kedalam array slugnya
        url += `/${value}`;
      });
      url += ".html";
    console.log("url",NewSlug)

    const response = useQuery(UrlResolver,{
        variables:{
            url:url
        }
    })
    const {loading, error, data} = response;

    //kalau masih loading
    if (loading) {
        return (
        <div>loading</div>
        );
    }

    if (error) {
        return <h2>Error...</h2>;
    }

    const resolver = data.urlResolver;

    return (
        <div>
            {getPage(resolver, NewSlug)}
        </div>
    )
}

// export const getServerSideProps = async (context) => {
//     console.log(context)
//     const url = context.query
  
//     return {
//       props:{ slug: url }
//     }
//   }

  DynamicPage.getInitialProps  = async (context) => {
    const url = context.query
  
    return {
      props:url
    }
  }

  export default withApollo({ ssr: true })(DynamicPage);
