import React from 'react'

// to tell nextjs how much html should be build based on data length
export const getStaticPaths = async () => {
    // const id = context.params.id
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const data = await res.json();

    const paths = data.categories.map(category => {
        return {
            params: { name: category.strCategory.toString(), id: category.idCategory.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    // console.log(context)
    const id = context.params.id
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    const data = await res.json();
  
    return {
      props: { meal: data }
    }
  }

function detailsFood({meal}) {

    return (
        <div className="container">
            this is food details
            {meal.meals.map(me=>(
                <div key={me.idMeal}>
                <h1>{me.strMeal}</h1>
                <p>{me.strInstructions}</p>
                </div>
            ))}
        </div>
    )
}

export default detailsFood
