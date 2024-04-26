import GithubSVG from "../assets/svg/GithubSVG";
import GmailSVG from "../assets/svg/GmailSVG";
// import LinedInSVG from "../assets/svg/LinedInSVG";
import useURLBlank from "../hooks/useURLBlank";

export default function ({ darkMode }: { darkMode: boolean }) {
    return (
        <>
            {/* <button>
                <LinedInSVG color={darkMode ? "#FFFFFF" : "#00000"} />
            </button> */}
            <button
                onClick={() => {
                    useURLBlank("https://github.com/itaylayzer");
                }}
            >
                <GithubSVG color={darkMode ? "#FFFFFF" : "#00000"} />
            </button>

            <button
                onClick={() => {
                    useURLBlank("mailto:itaylayzer@gmail.com");
                }}
            >
                <GmailSVG />
            </button>
        </>
    );
}
