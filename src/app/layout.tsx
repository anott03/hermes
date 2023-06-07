import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Heart, Github } from "@/components/Icons";
import Nav from "@/components/Nav";

export const metadata = {
    title: "Hermes",
    description: "Filesharing like never before",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <ClerkProvider
                appearance={{
                    variables: { colorPrimary: "#8b5cf6", colorText: "black" },
                    elements: { userButtonPopoverFooter: "hidden", userButtonBox: "p-2" },
                }}
            >
                <body>
                    <main className="w-screen h-screen flex flex-col bg-[#fbf9fc]">
                        <Nav />
                        {children}
                        {/* <footer className="w-full bg-stone-800 text-stone-400"> */}
                        <footer className="w-full text-purple-400">
                            <div className="max-w-7xl mx-auto p-6 flex flex-row justify-between items-center w-full">
                                <div>
                                    <small className="flex flex-row gap-2 items-center">
                                        Made with <Heart /> by Amitav
                                    </small>
                                </div>
                                <div>
                                    <a href="https://github.com/anott03/hermes">
                                        <Github />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </main>
                </body>
            </ClerkProvider>
        </html>
    );
}
