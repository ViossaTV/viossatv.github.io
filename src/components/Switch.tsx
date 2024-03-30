export default function ({ value, cases }: { value: number; cases: JSX.Element[] }) {
    try {
        return cases[value];
    } catch {
        return null;
    }
}
