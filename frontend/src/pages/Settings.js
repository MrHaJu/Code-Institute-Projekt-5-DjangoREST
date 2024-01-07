import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

export default function Settings() {
    
    const initialSettings = {
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--primary-color": "rgb(53, 148, 24)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
        "--text-dark": "#0A0A0A",
        "--font-size": "16px",
        "--animation-speed": 1
    };

    const [settings, setSettings] = useState(initialSettings);

    useEffect(() => {
    const root = document.documentElement;
    for (let key in settings) {
        root.style.setProperty(key, settings[key]);
    }
    // saves settings to Local Storage
    localStorage.setItem("userSettings", JSON.stringify(settings));
    //console.log("settings saved:", settings);
    }, [settings]);

    useEffect(() => {
        // Loads settings from Local Storage
        const storedSettings = localStorage.getItem("userSettings");
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
            //console.log("settings loaded:", JSON.parse(storedSettings));
        }
        }, []);

    const [theme, setTheme] = useState("light");
    const themes = [
        {
            id: 0,
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--primary-color": "rgb(53, 148, 24)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757",
        },
        {
            id: 0,
            "--background-color": "rgb(29, 29, 29)",
            "--background-light": "rgb(77, 77, 77)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--primary-color": "rgb(53, 148, 24)",
            "--text-color": "#ffffff",
            "--text-light": "#eceaea",
            },
    ]
    function changeTheme(i) {
        const newTheme = {...themes[i]}
        setTheme(i === 0 ? "light" : "dark")
        //update settings
        let _settings = {...settings}
        for(let key in newTheme){
            _settings[key] = newTheme[key]
        }
        setSettings(prevSettings => ({
            ...prevSettings,
            "--background-color": newTheme["--background-color"],
            "--background-light": newTheme["--background-light"],
            "--shadow-color": newTheme["--shadow-color"],
            "--text-color": newTheme["--text-color"],
            "--text-light": newTheme["--text-light"],
            "--primary-color": prevSettings["--primary-color"],
        }));
    }
    //change primary color
    function changeColor(i){
        const _color = primaryColors[i]
        let _settings = {...settings}
        _settings["--primary-color"] = _color
        setPrimaryColor(i)
        setSettings(_settings)
    }
    //change font size
    function changeFontSize(i){
        const _size = fontSizes[i]
        let _settings = {...settings}
        _settings["--font-size"] = _size.value
        setFontSize(i)
        setSettings(_settings)
    }
    //sets animation speed
    function changeAnimationSpeed(i){
        let _speed = animationSpeeds[i]
        let _settings = {...settings}
        _settings["--animation-speed"] = _speed.value
        setAnimationSpeed(i)
        setSettings(_settings)
    }
    //array for Primary colors
    const primaryColors = [
        "rgb(53, 148, 24)",
        "rgb(33, 150, 243)",
        "rgb(255, 193, 7)",
        "rgb(255, 0, 86)",
        "rgb(156, 39, 176)",
    ]
    //Array for font sizes
    const fontSizes = [
        {
            id: 0,
            title: "small",
            value: "12px"
        },
        {
            id: 1,
            title: "medium",
            value: "16px"
        },
        {
            id: 2,
            title: "large",
            value: "20px"
        },
    ]
    //array for animation speed
    const animationSpeeds = [
        {
            id: 0,
            title: "slow",
            value: "2"
        },
        {
            id: 1,
            title: "medium",
            value: "1"
        },
        {
            id: 2,
            title: "fast",
            value: ".5"
        },
    ]
    const [primaryColor, setPrimaryColor] = useState(0)
    const [fontSize, setFontSize] = useState(1)
    const [animationSpeed, setAnimationSpeed] = useState(1)

    return (
    <main>
        <div className="section d-block">
            {/*choose light or dark theme */}
            <h2>Preferred Theme</h2>
            <div className="options-container">
                <div className="option light" onClick={() => changeTheme(0)}>
                    {theme === "light" && (
                        <div className="check">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    )}
                </div>
                <div className="option dark" onClick={() => changeTheme(1)}>
                    {theme === "dark" && (
                        <div className="check">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="section d-block">
            {/*choose primary color */}
            <h2>Primary color</h2>
            <div className="options-container">
                { primaryColors.map((color, index) => (
                    <div key={index} className="option Light" style={{backgroundColor: color}} onClick={() => changeColor(index)}>
                        {primaryColor === index && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <div className="section d-block">
            {/*change font size */}
            <h2>Font size</h2>
            <div className="options-container">
                { fontSizes.map((size, index) => (
                    <button key={index} className="btn" onClick={() => changeFontSize(index)}>
                        {size.title}
                        { fontSize === index && <span><FontAwesomeIcon icon={faCheck} /></span> }
                        </button>
                ))}
            </div>
        </div>
        <div className="section d-block">
            {/*change animation speed */}
            <h2>Animation speed</h2>
            <div className="options-container">
                { animationSpeeds.map((speed, index) => (
                    <button key={index}  className="btn" onClick={() => changeAnimationSpeed(index)}>
                        {speed.title}
                        { animationSpeed === index && <span><FontAwesomeIcon icon={faCheck} /></span> }
                        </button>
                ))}
            </div>
        </div>
    </main>
    );

}
