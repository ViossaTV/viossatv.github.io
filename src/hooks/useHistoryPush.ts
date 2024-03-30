export default function (sub: string = "") {
    // @ts-ignore
    history.pushState(null, null, `/${sub}`);
}
