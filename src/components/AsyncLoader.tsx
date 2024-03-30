import { useEffect, useState } from "react";

export default function <T>({
    promise,
    fThen,
    fCatch,
    meanwhile,
}: {
    promise: Promise<T>;
    fThen: (data: T) => JSX.Element;
    fCatch?: (reason: Error) => JSX.Element;
    meanwhile?: JSX.Element;
}) {
    const [response, setResponse] = useState<T | undefined | Error>(undefined);
    const [type, setType] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        promise
            .then((data) => {
                setResponse(data);
                setType(true);
            })
            .catch((res) => {
                setResponse(res as Error);
                setType(false);
            });
    }, []);

    switch (true) {
        case type === undefined:
            return meanwhile ?? null;
        case type === false:
            return fCatch ? fCatch(response as Error) : null;
        default:
            return fThen(response as T);
    }
}
