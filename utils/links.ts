type NavLink = {
    href: string;
    label: string;
};

export const links: NavLink[] = [
    { href: '/', label: "Page d'accueil" },
    { href: '/favorites ', label: 'Favoris' },
    { href: '/bookings ', label: 'Réservations (voyageur)' },
    { href: '/reviews ', label: 'Mes avis' },
    { href: '/reservations ', label: 'Réservations (hôte)' },
    { href: '/rentals/create ', label: 'Créer un hébergement' },
    { href: '/rentals', label: 'Mes hébergements' },
    { href: '/admin', label: 'Administration' },
    { href: '/profile ', label: 'Profil' },
];