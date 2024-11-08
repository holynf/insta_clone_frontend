import { FC } from "react";
import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderNavbar from "@/components/header/HeaderNavbar";
import HeaderProfile from "@/components/header/HeaderProfile";

const Navbar: FC = () => {
    return (
        <nav className='header-navbar'>
            <HeaderLogo />
            <HeaderNavbar />
            <HeaderProfile />
        </nav>
    );
};

export default Navbar;
