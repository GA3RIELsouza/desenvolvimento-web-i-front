import { FaSign, FaSignInAlt, FaUser } from 'react-icons/fa'
import Nav from './nav'

export default function Header() {
    return(
        <header className="bg-gray-700 text-white">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-extrabold border-1 rounded-full px-4 py-1">
                    UniSENAI
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 hover:text-red-300 transition">
                        <FaUser className="w-5 h-5" />
                        <span className="hidden sm:inline">Cadastrar</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-300 transition">
                        <FaSignInAlt className="w-5 h-5" />
                        <span className="hidden sm:inline">Entrar</span>
                    </button>
                </div>
            </div>
            <div>
                <Nav />
            </div>
        </header>
    )
}
