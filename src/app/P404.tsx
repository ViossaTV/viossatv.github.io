import useURLGoto from "../api/useURLGoto";

export function P404() {
    return (
        <div
            id="root"
            style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div>
                <h1
                    style={{
                        color: "white",
                        fontFamily: "Rubik",
                        fontWeight: 400,
                        fontSize: 64,
                        marginBlock: 15
                    }}
                >
                    Page not found
                </h1>

                <center>
                    {" "}
                    <button
                        id="goBack"
                        onClick={() => {
                            useURLGoto();
                        }}
                    >
                        Go back to Home
                    </button>
                </center>
            </div>
        </div>
    );
}
