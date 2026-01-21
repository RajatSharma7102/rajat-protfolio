import type { Metadata } from "next";

export const metadata: Metadata= {
  title: "Rajat's Portfolio",
  description: "Sanity Rajat's Portfolio",
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            {children}
        </body>
    </html>
  )
}

export default layout