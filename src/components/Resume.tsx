import useURLBlank from "../api/useURLBlank";

export function Resume() {
    return (
        <main
            style={{
                overflowY: "auto",
                display: "block"
            }}
        >
            <div
                style={{
                    overflowY: "auto",
                    display: "block"
                }}
            >
                <img
                    style={{
                        position: "absolute",
                        cursor: "pointer",
                        height: 1200,
                        top: 100,
                        left: "50%",
                        translate: "-50% 0%",
                        zIndex: 1
                    }}
                    src="Resume.png"
                    alt=""
                    onClick={() => useURLBlank("Resume.pdf")}
                />
            </div>
        </main>
    );
}
