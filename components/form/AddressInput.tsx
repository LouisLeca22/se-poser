'use client'


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import React, { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export interface AddressFeature {
    properties: {
        label: string
        city: string
        postcode: string
        name: string
        context: string
    }
}

export interface AddressApiResponse {
    features: AddressFeature[]
}

const name = "address"

function AddressInput({ defaultValue }: { defaultValue?: string }) {

    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<AddressFeature[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)


    const fetchSuggestions = useDebouncedCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([])
            return
        }

        try {
            const res = await fetch(
                `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
            )
            if (!res.ok) throw new Error("Failed to fetch cities")
            const data = await res.json()
            setSuggestions(data.features || [])
            setShowSuggestions(true)
        } catch (err) {
            setSuggestions([])
        }
    }, 300)

    useEffect(() => {
        if (defaultValue) {
            setQuery(defaultValue)
        }
    }, [defaultValue])


    return (
        <div className="mb-2 relative">
            <Label htmlFor={name} className="capitalize">Adresse</Label>
            <Input
                id={name}
                name={name}
                type="text"
                defaultValue={defaultValue}
                placeholder="Renseigner l'adresse"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                    const value = e.target.value
                    setQuery(value)
                    fetchSuggestions(value)
                    if (value.trim() === "") {
                        setSuggestions([])
                    }
                }}
                onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true)
                }}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 100)
                }}
                className="w-full border px-3 py-2 rounded"
                required />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute border border-gray-300 bg-white mt-1 w-full z-10 rounded shadow-md max-h-60 overflow-auto dark:bg-muted dark:border-gray-600">
                    {suggestions.map((s, index) => (
                        <li
                            key={index}
                            onMouseDown={() => {
                                setQuery(s.properties.label)
                                setSuggestions([])
                                setShowSuggestions(false)
                            }}
                            className="cursor-pointer hover:bg-primary hover:text-white px-3 py-2"
                        >
                            {s.properties.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default AddressInput