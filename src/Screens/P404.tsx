import SunSVG from "../assets/svg/SunSVG";
import SVGLinks from "../components/SVGLinks";
import useURLGoto from "../hooks/useURLGoto";

function App({ darkMode, SetDarkMode }: { darkMode: boolean; SetDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <header style={{ backgroundColor: darkMode ? undefined : "white" }}>
                <div></div>
                <div style={{ gap: 20 }}>
                    <button style={{ whiteSpace: "nowrap" }} onClick={() => useURLGoto()} data-main>
                        Coder-1t45
                    </button>
                    <button onClick={() => useURLGoto("portfolio")}>Portfolio</button>
                    <button onClick={() => useURLGoto("resume")}>Resume</button>
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
            <main data-switcher>
                <main className="main">
                    <h1>Page Error 404</h1>
                    <img src="" alt="" />
                    <h2>not found</h2>
                </main>
            </main>
        </>
    );
}

export default App;
