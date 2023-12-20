import RecipeCard from "../components/RecipeCard"
import PreviousSearches from "../components/previousSearches"

//array for recipes
export default function Recepies() {
    const recipes = [
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
        {
            name: "Rezeptname",
            image: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701428089/PP5/Rezept_bild_ax87td.png",
            authorImg: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701427688/PP5/Autor_bild_nkd5e8.png",
            title: "Rezeptname",
            descript: "Beschreibung",
            link: "Link zum Rezept"
        },
    ].sort(() => Math.random() - 0.5)
    return (
        <main>
            <PreviousSearches />
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
                
            </div>
        </main>
    )
}