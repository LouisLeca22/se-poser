import NavSearch from "./NavSearch"
import LinksDropDown from "./LinksDropdown"
import DarkMode from "./DarkMode"
import Logo from "./Logo"
import CitySearch from "./CitySearch"

function Navbar() {
    return (
        <nav className="border-b">
            <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
                <div className="flex items-center gap-2">
                    <Logo />
                    <span className="text-sm text-muted-foreground">
                        Créé par © {" "}
                        <a
                            href="https://louis-leca.web.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            Louis Leca
                        </a>
                    </span>
                </div>
                <div className="flex gap-4">
                    <NavSearch />
                    <CitySearch />
                </div>

                <div className="flex gap-4 items-center">
                    <DarkMode />
                    <LinksDropDown />
                </div>
            </div>
        </nav>
    )
}
export default Navbar