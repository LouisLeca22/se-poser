type NavLink = {
    href: string;
    label: string;
};

export const links: NavLink[] = [
    { href: '/', label: "Page d'accueil" },
    { href: '/favorites ', label: 'Favoris' },
    { href: '/bookings ', label: 'Réservations en cours' },
    { href: '/reviews ', label: 'Mes avis' },
    { href: '/reservations ', label: 'Historique des réservations' },
    { href: '/rentals/create ', label: 'Créer un hébergement' },
    { href: '/rentals', label: 'Mes hébergements' },
    { href: '/admin', label: 'Administration' },
    { href: '/profile ', label: 'Profil' },
];