export default function (url: string = "") {
    // Get the current URL
    const currentUrl = window.location.href;

    // Extract the protocol and root domain
    const protocol = currentUrl.split("://")[0]; // Get the protocol (http or https)
    const domain = currentUrl.split("/")[2]; // Get the root domain

    // Redirect to the root domain using the same protocol
    window.location.href = `${protocol}://${domain}/${url}`;
}
