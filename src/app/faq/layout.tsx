import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
