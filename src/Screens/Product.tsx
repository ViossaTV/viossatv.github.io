import { useRef, useState, useEffect } from "react";
import ReactMK from "react-markdown";
import AsyncLoader from "../components/AsyncLoader";
import useMarkdown from "../hooks/useMarkdown";
import useURLBlank from "../hooks/useURLBlank";
import TWEEN from "@tweenjs/tween.js";
import SunSVG from "../assets/svg/SunSVG";
import SVGLinks from "../components/SVGLinks";

function Product({
    darkMode,
    SetDarkMode,
    item,
    onCancel,
}: {
    item: Product;
    onCancel: () => void;
    darkMode: boolean;
    SetDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [nav, setNavIndex] = useState<number>(0);
    const switcherMainRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = switcherMainRef.current;
        if (element === null) return;

        const startX = { x: element.scrollLeft };
        const endX = { x: nav * window.innerWidth };
        const tween = new TWEEN.Tween(startX)
            .to(endX)
            .easing(TWEEN.Easing.Exponential.Out)
            .duration(1600)
            .onUpdate((value) => {
                console.log(value);
                element.scrollTo(value.x, 0);
            })
            .start(0);
        let time = 0;
        const interval = setInterval(() => {
            tween.update((time += 1000 / 17));
        }, 17);

        return () => {
            clearInterval(interval);
            tween.stop();
        };
    }, [switcherMainRef, nav, window.innerWidth]);
    return (
        <>
            <header>
                <div>
                    <br />
                    <button onClick={onCancel}>{"<<<"}</button>
                </div>
                <div>
                    <button data-selected={nav === 0} onClick={() => setNavIndex(0)} data-main>
                        {item.title}
                    </button>
                    <div className="space"></div>
                    <button data-selected={nav === 1} onClick={() => setNavIndex(1)}>
                        README.md
                    </button>
                    <button data-selected={nav === 2} onClick={() => setNavIndex(2)}>
                        Pictures
                    </button>
                    <button data-selected={nav === 3} onClick={() => setNavIndex(3)}>
                        Videos
                    </button>
                    <button data-selected={false} onClick={() => useURLBlank(item.github)}>
                        Github
                    </button>
                    <div></div>
                </div>

                <div>
                    <br />
                    <button
                        onClick={() => {
                            SetDarkMode((old) => {
                                return !old;
                            });
                        }}
                    >
                        <SunSVG color={darkMode ? "#FFFFFF" : "#00000"} />
                    </button>
                    <SVGLinks darkMode={darkMode} />
                </div>
            </header>
            <main ref={switcherMainRef} data-switcher>
                <main data-iframe>
                    {" "}
                    <iframe src={item.gameURI}></iframe>
                </main>
                <main>
                    <AsyncLoader
                        promise={useMarkdown(item.markDown)}
                        fThen={(data) => (
                            <div className="react-mk">
                                <ReactMK>{data}</ReactMK>
                            </div>
                        )}
                    />
                </main>
                <main>
                    <h1>Pictures</h1>
                    {item.pictures.length === 0 ? <h2>theres no images to load</h2> : <></>}
                </main>
                <main>
                    <h1>Videos</h1>
                    {item.pictures.length === 0 ? <h2>theres no videos to load</h2> : <></>}
                </main>
            </main>
        </>
    );
}

export default Product;
