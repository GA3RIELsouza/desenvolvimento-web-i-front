import { FaSign, FaSignInAlt, FaUser } from 'react-icons/fa'
import Nav from './nav'

export default function Header() {
    return(
        <header className="bg-gray-700 text-white">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-extrabold border-1 rounded-full px-4 py-1">
                    CV Builder
                </div>
            </div>
            <div>
                <Nav />
            </div>
        </header>
    )
}
