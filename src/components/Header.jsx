import TopBar from "./TopBar"
import Navigation from "./Navigation"

export default function Header() {
    return (
        <>
        <TopBar />
        <header>
            <h1>NC News</h1>
        </header>
        <Navigation />
        </>
    )
}