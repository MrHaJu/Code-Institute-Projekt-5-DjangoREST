import CustomImage from "./customimage"


export default function RecipeCard({recipe}) {
    return(
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg} alt="Chef" />
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">{recipe.descript}</p>
                <a className="view-btn" href={recipe.link}>View Recipe</a>
            </div>
        </div>
    )
}