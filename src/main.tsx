import ReactDOM from "react-dom/client";
import App from "./Screens/App.tsx";
import "./main.css";
import { useEffect, useState } from "react";
import { productsSample } from "./data/sample.ts";
import Product from "./Screens/Product.tsx";

import Title from "./components/Title.tsx";
import P404 from "./Screens/P404.tsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function Main({
    defualtNav,
    darkMode,
    SetDarkMode,
}: {
    defualtNav: number;
    darkMode: boolean;
    SetDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const array = productsSample;
    const [selected, setSelected] = useState<number>(-1);

    useEffect(() => {
        document.body.setAttribute("dark-mode", darkMode ? "t" : "f");
    }, [darkMode]);

    switch (selected) {
        case -1:
            return <App darkMode={darkMode} SetDarkMode={SetDarkMode} defualtNav={defualtNav} array={array} setSelected={setSelected} />;
        default:
            return (
                <>
                    <Title>{array[selected].title}</Title>
                    <Product
                        darkMode={darkMode}
                        SetDarkMode={SetDarkMode}
                        item={array[selected]}
                        onCancel={() => {
                            setSelected(-1);
                        }}
                    />
                </>
            );
    }
}

function DarkModeContainer() {
    const [darkMode, SetDarkMode] = useState<boolean>(true);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main darkMode={darkMode} SetDarkMode={SetDarkMode} defualtNav={0} />} />
                <Route path="/Resume" element={<Main darkMode={darkMode} SetDarkMode={SetDarkMode} defualtNav={2} />} />
                <Route path="/Portfolio" element={<Main darkMode={darkMode} SetDarkMode={SetDarkMode} defualtNav={1} />} />
                <Route path="*" element={<P404 darkMode={darkMode} SetDarkMode={SetDarkMode} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<DarkModeContainer />);
