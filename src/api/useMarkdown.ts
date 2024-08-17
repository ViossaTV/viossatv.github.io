export default async function (url: string) {
    const response = await fetch(url);
    return await response.text();
}
    