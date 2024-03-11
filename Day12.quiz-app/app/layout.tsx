import Link from "next/link";
import { Header } from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <nav>
          <Header />
        </nav>
        <main
          style={{
            padding: "20px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
