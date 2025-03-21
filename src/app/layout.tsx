import "./globals.css";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
            <title>Note Tagging App</title>
            <meta name="A note tagging application" content="" />
        </head>
        <body className="flex flex-row justify-center m-0 p-0 h-screen">
        <div id="root" className="flex flex-row justify-center">{ children }</div>
        </body>
        </html>
    );
}