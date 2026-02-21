import Link from 'next/link'
function Nav(){
    return(
        <nav>
            <ul className='flex flex-row m-5 rounded-xl gap-10 py-2 px-3'>
                <li className='hover:bg-white/20 rounded-full p-5'>
                    <Link href="/">Leagues</Link>
                </li>
                <li className='hover:bg-white/20 rounded-full p-5'>
                    <Link href="/teams">Teams</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;