import { useEffect } from "react";

export default function ({ children }: { children: string }) {
    useEffect(() => {
        document.title = children;
    }, []);
    return null;
}
