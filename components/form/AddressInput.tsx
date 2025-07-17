'use client'


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import React, { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'


interface Feature {
    properties: {
        label: string
    }
}

interface AddressApiResponse {
    features: Feature[]
}


const name = "address"

function AddressInput({ defaultValue }: { defaultValue?: string }) {

    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounce(query, 300)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showList, setShowList] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const ignoreNextQuery = useRef(false)

    useEffect(() => {
        if (ignoreNextQuery.current) {
            ignoreNextQuery.current = false
            return
        }

        if (debouncedQuery.length < 3) {
            setSuggestions([])
            setShowList(false)
            return
        }


        async function fetchSuggestions() {
            const res = await fetch(
                `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(debouncedQuery)}&limit=5`
            )
            const data: AddressApiResponse = await res.json()
            if (data && data.features) {
                const hits = data.features.map((f) => f.properties.label)
                setSuggestions(hits)
                setShowList(true)
            }
        }

        fetchSuggestions()
    }, [debouncedQuery])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowList(false)
            }
        }

        document.addEventListener('click', handleClickOutside) // changed here
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleSelect = (value: string) => {
        ignoreNextQuery.current = true
        setQuery(value)
        setSuggestions([])
        setShowList(false)

    }

    return (
        <div className="mb-2 relative" ref={containerRef}>
            <Label htmlFor={name} className="capitalize">Adresse</Label>
            <Input
                id={name}
                name={name}
                type="text"
                defaultValue={defaultValue}
                placeholder="Renseigner l'adresse"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required />
            {showList && suggestions.length > 0 && (
                <ul className="absolute border bg-white mt-1 w-full z-10 rounded shadow max-h-60 overflow-auto">
                    {suggestions.map((s, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(s)}
                            className="cursor-pointer hover:bg-primary hover:text-white px-3 py-2"
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default AddressInput