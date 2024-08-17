import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { SlideShow } from "../components/SlideShow";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import useURLBlank from "../api/useURLBlank";
import { productsSample } from "../data/sample";
import { Resume } from "../components/Resume";
import { categories, catExplenations } from "../data/constants";
function App() {
    const [navIndex, setNavIndex] = useState<number>(2);

    const screenComponents = categories
        .slice(0, 4)
        .map((cname, cindex) => (
            <SlideShow key={cname} products={productsSample[cindex]} />
        ));

    screenComponents.push(<Resume />);

    const screenComponent = screenComponents[navIndex];

    return (
        <div id="root">
            <Tooltip
                id="t"
                style={{
                    backgroundColor: "#020202",
                    zIndex: 3,
                    fontFamily: "monospace"
                }}
            />
            <nav>
                {categories.map((name, index) => (
                    <button
                        data-selected={index === navIndex}
                        data-tooltip-id="t"
                        data-tooltip-content={catExplenations[index]}
                        onClick={() => {
                            setNavIndex(index);
                        }}
                    >
                        {name}
                    </button>
                ))}
            </nav>
            {screenComponent}
            <footer>
                <button
                    onClick={() => useURLBlank("https://github.com/itaylayzer")}
                    data-tooltip-id="t"
                    data-tooltip-content="Visit my Github"
                >
                    <IoLogoGithub size={25} color="white" />
                </button>
                <button
                    onClick={() => useURLBlank("mailto:itaylayzer@gmail.com")}
                    data-tooltip-id="t"
                    data-tooltip-content="Contact me on Gmail"
                >
                    <SiGmail size={25} color="white" />
                </button>
            </footer>
        </div>
    );
}

export default App;
