
export async function validateFrenchAddress(input: string) {
    const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=1`
    )

    const data = await res.json()
    const feature = data.features?.[0]

    if (!feature) return null

    const label = feature.properties.label


    const isValid = label.toLowerCase() === input.trim().toLowerCase()

    if (!isValid) return null


    return {
        address: label,
        city: feature.properties.city,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
    }
}
