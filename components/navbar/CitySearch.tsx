'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import React, { useState, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'


interface City {
    nom: string
    code: string
    population: number
}


const name = "city"

function CityInput() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [city, setCity] = useState(searchParams.get("city")?.toString() || "")

    const [suggestions, setSuggestions] = useState<City[]>([])
    const [showList, setShowList] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const ignoreNextQuery = useRef(false)

    const fetchSuggestions = useDebouncedCallback(async () => {
        const res = await fetch(
            `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(city)}&boost=population&limit=5`
        )
        const data: City[] = await res.json()
        if (Array.isArray(data)) {
            setSuggestions(data)
            setShowList(true)
        }
    }, 500)

    useEffect(() => {

        if (!searchParams.get("city")) {
            setCity("")
        }

    }, [searchParams.get("city")])


    useEffect(() => {
        // if (ignoreNextQuery.current) {
        //     ignoreNextQuery.current = false
        //     return
        // }

        const params = new URLSearchParams(searchParams)

        if (!city) {
            params.delete("city")
            replace(`${pathname}?${params.toString()}`)

            setSuggestions([])
            setShowList(false)
            return
        }


        fetchSuggestions()
    }, [city])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowList(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])



    const handleSelect = (value: string) => {
        ignoreNextQuery.current = true
        setCity(value)
        setSuggestions([])
        setShowList(false)
        const params = new URLSearchParams(searchParams)
        if (city) {
            params.set("city", value)
        } else {
            params.delete("city")
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-full relative" ref={containerRef}>
            <Input
                id={name}
                name={name}
                type="text"
                placeholder="Renseigner la ville..."
                autoComplete="off"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required />
            {showList && suggestions.length > 0 && (
                <ul className="absolute border bg-white mt-1 w-full z-10 rounded shadow max-h-60 overflow-auto">
                    {suggestions.map((city) => (
                        <li
                            key={city.code}
                            onClick={() => handleSelect(city.nom)}
                            className="cursor-pointer hover:bg-primary hover:text-white px-3 py-2"
                        >
                            {city.nom} ({city.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CityInput
