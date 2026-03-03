import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Returns & Exchanges | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ReturnsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
