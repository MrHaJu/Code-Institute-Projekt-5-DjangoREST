import CustomImage from "./customimage"


import { Link } from "react-router-dom";

export default function HeroSection(){
    //Image array 
    const images = [
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701115697/PP5/farhad-ibrahimzade-TvMWBS6TIsg-unsplash_ubjfew.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701115676/PP5/artur-kornakov-kwJhh14nUcs-unsplash_rz3obd.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701115676/PP5/sanket-shah-eEWlcfydzQ4-unsplash_inwlwv.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093552/PP5/olga-kudriavtseva-JIjtV1gmfxo-unsplash_dsedxo.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093519/PP5/homescreenify-sA3wymYqyaI-unsplash_r0qada.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093519/PP5/amirali-mirhashemian-sc5sTPMrVfk-unsplash_osk1jh.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093519/PP5/food-photographer-Fn6dPYtPUMc-unsplash_h4rz8w.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093519/PP5/carolina-cossio-Ucwd8w-JHwM-unsplash_nzj5aa.jpg",
        "https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701093519/PP5/max-griss-cToNEm70cvE-unsplash_m9499h.jpg",

    ]
    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">What are we about</h1>
                <p className="info">Mr.HaJu's Recipes is a place where you can share your recepies with other people. </p>
                <Link to="/recipes" className="btn">
                    explore now
                </Link>
            </div>
            <div className="col gallery">
                { images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                ))}
                

            </div>
        </div>
    )
}