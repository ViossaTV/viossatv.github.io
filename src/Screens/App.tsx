import { useEffect, useRef, useState } from "react";
import ScrollView from "../components/ScrollView";
import useURLBlank from "../hooks/useURLBlank";
import DateTimer from "../components/DateTimer";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import useTitle from "../hooks/useTitle";
import SunSVG from "../assets/svg/SunSVG";
import SVGLinks from "../components/SVGLinks";
import useHistoryPush from "../hooks/useHistoryPush";

function App({
    defualtNav,
    array,
    setSelected,
    darkMode,
    SetDarkMode,
}: {
    defualtNav?: number;
    array: Array<Product>;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    darkMode: boolean;
    SetDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [nav, setNavIndex] = useState<number>(-1);
    const switcherMainRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const element = switcherMainRef.current;
        if (element === null) return;

        if (nav < 0 && defualtNav !== undefined) {
            element.scrollTo(defualtNav * window.innerWidth, 0);
            setNavIndex(defualtNav);
            return;
        }

        let intervals: number[] = [];
        let tween: Tween<any> | undefined = undefined;

        const startX = { x: element.scrollLeft };
        const endX = { x: nav * window.innerWidth };

        function startTween() {
            for (const interval of intervals) clearInterval(interval);
            intervals = [];
            if (tween) tween.stop();
            tween = new TWEEN.Tween(startX)
                .to(endX)
                .easing(TWEEN.Easing.Exponential.Out)
                .duration(1600)
                .onUpdate((value) => {
                    element!.scrollTo(value.x, 0);
                })
                .start(0);
            let time = 0;
            intervals.push(
                setInterval(() => {
                    tween?.update((time += 1000 / 17));
                }, 17)
            );
        }

        function onResize() {
            console.log("holla");
            startTween();
            console.log("holla");
        }

        startTween();

        window.addEventListener("resize", onResize);

        return () => {
            for (const interval of intervals) clearInterval(interval);
            if (tween) tween.stop();
            intervals = [];
            window.removeEventListener("resize", onResize);
        };
    }, [switcherMainRef, nav]);

    useEffect(() => {
        const titles = ["itaylayzer", "Portfolio", "Resume"];
        try {
            useTitle(titles[nav]);
        } catch {}
    }, [nav]);
    return (
        <>
            <header style={{ backgroundColor: darkMode ? undefined : "white" }}>
                <div></div>
                <div style={{ gap: 20 }}>
                    <button
                        style={{ whiteSpace: "nowrap" }}
                        data-selected={nav === 0}
                        onClick={() => {
                            setNavIndex(0);
                            useHistoryPush("");
                        }}
                        data-main
                    >
                        itaylayzer
                    </button>
                    <button
                        data-selected={nav === 1}
                        onClick={() => {
                            setNavIndex(1);
                            useHistoryPush("portfolio");
                        }}
                    >
                        Portfolio
                    </button>
                    <button
                        data-selected={nav === 2}
                        onClick={() => {
                            setNavIndex(2);
                            useHistoryPush("resume");
                        }}
                    >
                        Resume
                    </button>
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
                <main className="main">
                    <div>
                        <h4>itaylayzer Presents:</h4>
                        <h1 style={{ marginTop: "0px", marginBottom: "0px", translate: "0px -20px" }}>
                            <span style={{ opacity: 0.5 }}>Pick</span> <span style={{ opacity: 0.75 }}>your </span>
                            <span
                                style={{
                                    textShadow: `2px 7px 5px rgba(${darkMode ? "255,255,255,0.3" : "0,0,0,0.3"}), 0px -4px 10px rgba(${
                                        !darkMode ? "255,255,255,0.3" : "0,0,0,0.3"
                                    })`,
                                }}
                            >
                                GAME
                            </span>
                        </h1>
                    </div>
                    <div>
                        <center>
                            <ScrollView direction="horizontal">
                                {array.map((sample, index) => (
                                    <div
                                        onClick={() => {
                                            setSelected(index);
                                        }}
                                    >
                                        <img src={sample.picture} alt="" />
                                    </div>
                                ))}
                            </ScrollView>
                        </center>
                    </div>
                    <div>
                        <div></div>
                        <div>
                            <center>
                                <button className="contant" onClick={() => useURLBlank("mailto:itaylayzer@gmail.com")}>
                                    contant on email <span>itaylayzer@gmail.com</span>
                                </button>
                            </center>
                        </div>
                        <div></div>
                    </div>
                </main>

                <main className="main">
                    <div>
                        <h4>my name is</h4>
                        <h1 style={{ marginTop: "0px", marginBottom: "0px", translate: "0px -20px" }}>Itay Layzerovich </h1>
                        <h4>THE TIME WILL COME (i started working on it)</h4>
                        <br />
                        <DateTimer date={new Date(2024, 6, 1, 18, 0, 0, 0)} />
                    </div>
                </main>
                <main className="resume" style={{ backgroundColor: darkMode ? undefined : "whitesmoke" }}>
                    <img
                        style={{
                            boxShadow: darkMode ? undefined : "box-shadow: 0 20px 60px 0 rgba(186,200,227,.1), 0 16px 36px 0 rgba(186,200,227,.3);",
                        }}
                        onClick={() => useURLBlank("Resume.pdf")}
                        src="Resume.png"
                        alt=""
                    />
                </main>
            </main>
        </>
    );
}

export default App;
