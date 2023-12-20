import { Link } from "react-router-dom";

export default function ImproveSkills(){
    //List array
    const list =[
        "Learn new recepies",
        "Experiment with food",
        "Write your own recepies",
        "Know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ]
    return(
        <div className="section improve-skills">
            <div className="col img">
            <img src="https://res.cloudinary.com/db6t1xmmn/image/upload/c_scale,w_550/v1701179766/PP5/vinicius-benedit--1GEAA8q3wk-unsplash_f6mh8r.jpg" alt="Sushi" />
            </div>
            <div className="col typography">
                <h1 className="title">Improve your Skills</h1>
                {list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                ))}
                <Link to="/register" className="btn">
                    Sign Up Now
                </Link>
            </div>
            
        </div>
    )
}