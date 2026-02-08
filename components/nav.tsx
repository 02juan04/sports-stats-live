import Link from 'next/link'
function Nav(){
    return(
        <nav className='w-75'>
            <ul className='flex flex-row justify-between w-full mt-7 mb-10'>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/live-games">Live Games</Link>
                </li>
                <li>
                    <Link href="/teams">Teams</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;