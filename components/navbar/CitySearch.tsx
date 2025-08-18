"use client"
import { Input } from "../ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"

type City = {
    nom: string
    code: string
    departement: { code: string }
}

function CitySearch() {
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const [city, setCity] = useState(searchParams.get("city")?.toString() || "")
    const [suggestions, setSuggestions] = useState<City[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const updateURL = (selectedCity: string) => {
        const params = new URLSearchParams(searchParams)
        if (selectedCity) {
            params.set("city", selectedCity)
            params.delete("page")
        } else {
            params.delete("city")
        }
        replace(`/?${params.toString()}`)
    }

    const fetchSuggestions = useDebouncedCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }

        try {
            const res = await fetch(
                `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,code,departement&boost=population&limit=5`
            )
            if (!res.ok) throw new Error("Failed to fetch cities")
            const data = await res.json()
            setSuggestions(data)
            setShowSuggestions(true)
        } catch (err) {
            setSuggestions([])
        }
    }, 300)

    useEffect(() => {
        if (!searchParams.get("city")) {
            setCity("")
        }
    }, [searchParams.get("city")])

    return (
        <div className="relative w-full">
            <Input
                type="text"
                placeholder="Rechercher une ville..."
                className="w-full border px-3 py-2 rounded dark:bg-muted"
                value={city}
                onChange={(e) => {
                    const value = e.target.value
                    setCity(value)
                    fetchSuggestions(value)
                    if (value.trim() === "") {
                        updateURL("")
                        setSuggestions([])
                    }
                }}
                onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true)
                }}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 100)
                }}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto dark:bg-muted dark:border-gray-600">
                    {suggestions.map((city) => (
                        <li
                            key={city.code}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onMouseDown={() => {
                                const selected = city.nom
                                setCity(selected)
                                updateURL(selected)
                                setSuggestions([])
                                setShowSuggestions(false)
                            }}
                        >
                            {city.nom} ({city.departement.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CitySearch
