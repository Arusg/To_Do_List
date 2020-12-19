import React from 'react';
import Image from './image';
import Paragraph from './paragraph';
import Link from './link';

function Header() {
    return (
        <header className="App-header">
            <Image />
            <Paragraph />
            <Link />
        </header>
    )
    
}

export default Header;