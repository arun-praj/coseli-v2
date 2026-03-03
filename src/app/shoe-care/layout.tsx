import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shoe Care Guide | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ShoeCareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
