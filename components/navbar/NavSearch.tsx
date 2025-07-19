"use client"
import { Input } from "../ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"

function NavSearch() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [search, setSearch] = useState(searchParams.get("search")?.toString() || "")

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams)
        if (search) {
            params.set("search", value)
        } else {
            params.delete("search")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 500)

    useEffect(() => {
        if (!searchParams.get("search")) {
            setSearch("")
        }
    }, [searchParams.get("search")])

    return <Input
        type="text"
        placeholder="Trouver un hébergement..."
        className="max-w-xs dark:bg-muted"
        value={search}
        onChange={(e) => {
            setSearch(e.target.value)
            handleSearch(e.target.value)
        }}
    />
}
export default NavSearch