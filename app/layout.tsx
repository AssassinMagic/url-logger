export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <title>URL Logger App</title>
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  }