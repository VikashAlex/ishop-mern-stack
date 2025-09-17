import StoreProvider from "./(user_website)/components/StoreProvider";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
