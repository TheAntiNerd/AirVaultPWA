import UiLayout from "./UiLayout";

export default function UiMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <UiLayout children={children} />
    );
}
