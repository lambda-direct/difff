export function get() {
    return {
        body: `
        <meta name="robots" content="nofollow, noopener, noreferrer">
      `,
        headers: {
            "Content-Type": "text/html"
        }
    };
}
