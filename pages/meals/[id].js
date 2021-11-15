import React from 'react'
import Head from 'next/head'

function detailsFood({meal}) {
    return (
        <>
        <Head>
        <title>Maem | Detail</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        </Head>
        <div className="container">
            {meal.meals.map(me=>(
                <div key={me.idMeal} className="row align-items-center mb-4">
                    <div className="col-lg-6 col-12">
                        <span className="badge bg-warning text-dark p-2">{me.strCategory}</span>
                        <h1 className="mb-4">{me.strArea}</h1>
                        <img className="mb-4" src={me.strMealThumb} width={400}/>
                    </div>
                    <div className="col-lg-6 col-12">
                        <p>{me.strInstructions}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const id = context.params.id
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    const data = await res.json();
    
  
    return {
      props: { meal: data }
    }
  }

export default detailsFood