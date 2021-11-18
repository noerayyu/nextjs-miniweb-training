import React from 'react'
import { useRouter } from "next/router";

function Category() {
    const router = useRouter();
    console.log(router)
    return (
        <div>
            wlcome to category page
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

export default Category
