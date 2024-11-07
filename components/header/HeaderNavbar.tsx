import Link from "next/link";
import { Heart, Home, PlusSquare, Search, User } from "lucide-react";

export default function HeaderNavbar() {
    return (
        <div className='header-navbar-links'>
            <Link href='/' aria-label='Home'>
                <Home className='navbar-link-icon' />
            </Link>
            <Link href='/' aria-label='Search'>
                <Search className='navbar-link-icon' />
            </Link>
            <Link href='/' aria-label='Create Post'>
                <PlusSquare className='navbar-link-icon' />
            </Link>
            <Link href='/' aria-label='Notifications'>
                <Heart className='navbar-link-icon' />
            </Link>
            <Link href='/' aria-label='Profile'>
                <User className='navbar-link-icon' />
            </Link>
        </div>
    );
}
