import React from 'react'
import { useQuery,gql } from "@apollo/client";

import Category from '../comps/category';
import { withApollo } from '../lib/apollo/apolloClient';

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

const getPage = (resolver) => {
    if (!resolver) {
      return <div>Page not found</div>;
    } else if (resolver.type === "CATEGORY") {
      return <Category />;
    } 
    // else if (resolver.type === "PRODUCT") {
    //   return <Product url_key={slug[0]} />;
    // }
    return <span />;
  };

function DynamicPage({slug}) {
    // const { query } = slug;
    let url = ''
    let NewSlug = [];
    slug.slug.map((value) => {
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
            {getPage(resolver)}
        </div>
    )
}

export const getServerSideProps = async (context) => {
    console.log(context)
    const url = context.query
  
    return {
      props:{ slug: url }
    }
  }

  export default withApollo({ ssr: false })(DynamicPage);
