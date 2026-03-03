import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Collections | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CollectionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
