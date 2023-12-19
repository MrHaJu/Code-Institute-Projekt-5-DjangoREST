import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook,faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons"

export default function ChiefCard({chief}) {
    //create cards for each chef
    return (
        <div className="chief-card">
            <div className="chief-card-image">
                <img src={chief.img} alt="Chiefs" />
            </div>
            <div className="chief-card-info">
                <h3 className="chief-card-name">{chief.name}</h3>
                <p className="chief-recipe-count">Recipes: <b>{chief.recipesCount}</b></p>
                <p className="chief-cuisine">Cuisine: <b>{chief.cuisine}</b></p>
                <p className="chief-icons">
                <a href={chief.facebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook}  /></a>
                <a href={chief.twitter} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
                <a href={chief.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                </p>
            </div>
        </div>
    )
}