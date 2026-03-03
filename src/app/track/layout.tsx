import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Track Your Order | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function TrackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
