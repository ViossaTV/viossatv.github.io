import { useEffect, useRef } from "react";

export default function ScrollView({ children, direction }: { children: JSX.Element[]; direction: "horizontal" | "vertical" }) {
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = articleRef.current;
        if (element === null) return;

        let velocity: number = 0;
        let doScroll: boolean = false;

        function handleMouseDown() {
            velocity = 0;
            doScroll = true;
        }

        function handleMouseMove(event: MouseEvent) {
            if (!doScroll) return;
            event.preventDefault();
            document.body.style.cursor = "grab";
            velocity = event.movementX * 2;
        }

        function handleMouseUp() {
            document.body.style.cursor = "";
            doScroll = false;
        }

        function onChildClick() {
            // velocity = 0;
        }

        function onScoll(event: WheelEvent) {
            element!.scrollBy(-event.deltaY, 0);
        }

        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseup", handleMouseUp);
        element.addEventListener("wheel", onScoll);

        const children = element.children[0].children;

        const interval = setInterval(() => {
            direction ? element.scrollBy(-velocity, 0) : element.scrollBy(0, -velocity);
            velocity /= 1.09;
        }, 17);

        for (const child of children) {
            child.addEventListener("click", onChildClick);
        }

        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseup", handleMouseUp);
            element.removeEventListener("wheel", onScoll);

            for (const child of children) {
                child.removeEventListener("click", onChildClick);
            }
            clearInterval(interval);
        };
    }, [articleRef]);

    return (
        <article className="scroll" ref={articleRef}>
            <section className="scroll">{children}</section>
        </article>
    );
}
