import ChiefCard from "./ChiefCard"

export default function ChiefsSection() {
    //Chef array. 
    const chiefs = [
        {
            name: "Tim Mälzer",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348242/PP5/tim_maelzer_j9rcov.png",
            recipesCount: "05",
            cuisine: "German",
            twitter: "https://twitter.com/tim_kocht",
            facebook: "https://www.facebook.com/tim.maelzer",
            instagram: "https://www.instagram.com/timmaelzer_official/",
        },
        {
            name: "Frank Rosin",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348236/PP5/frank_rosin_lz4ir6.png",
            recipesCount: "11",
            cuisine: "German",
            twitter: "https://twitter.com/FrankRosin1",
            facebook: "https://www.facebook.com/Frank.Rosin.For.Friends",
            instagram: "https://www.instagram.com/frank_rosin/",
        },
        {
            name: "Johann Lafer",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348239/PP5/Johann_Lafer_gipmqq.png",
            recipesCount: "17",
            cuisine: "German",
            twitter: "https://twitter.com/grandcheflafer",
            facebook: "https://www.facebook.com/johannlafer",
            instagram: "https://www.instagram.com/johann.lafer/",
        },
        {
            name: "Horst Lichter",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348237/PP5/Horst_Lichter_pnkpyf.png",
            recipesCount: "3",
            cuisine: "German",
            twitter: "https://twitter.com/horst60656",
            facebook: "https://www.facebook.com/horstlichter",
            instagram: "https://www.instagram.com/horstlichter__offiziell/",
        },
        {
            name: "Cornelia Poletto",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348235/PP5/cornelia_poletto_z5zlp3.png",
            recipesCount: "22",
            cuisine: "German",
            twitter: "https://twitter.com/grandcheflafer",
            facebook: "https://www.facebook.com/p/Cornelia-Poletto-100044828002787/",
            instagram: "https://www.instagram.com/corneliapoletto/",
        },
        {
            name: "Sarah Wiener",
            img: "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701348240/PP5/sarah_wiener_gqwbdj.png",
            recipesCount: "08",
            cuisine: "German",
            twitter: "https://twitter.com/wienerofficial",
            facebook: "https://www.facebook.com/sarahwienerofficial/",
            instagram: "https://www.instagram.com/sarahwienerofficial/",
        },

    ]
    return (
        <div className="section chiefs">
            <h1 className="title"> Our Top Chefs</h1>
            <div className="top-chiefs-container">
                {chiefs.map(chief => <ChiefCard key={chief.name} chief={chief} />) }
            </div>
        </div>
    )
}