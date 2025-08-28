import { useState } from "react"
import { GiFrenchFries } from "react-icons/gi"
import { Link } from "react-router-dom"

export default function Nav() {
    const [isOpen, setOpen] = useState(false)

    return(
        <nav>
            <hr className="border-1 border-white mb-2"></hr>
            <ul className="flex justify-center gap-10">
                <li className="px-2 py-1 hover:bg-gray-500"><Link to="/">Início</Link></li>
                <li className="px-2 py-1 hover:bg-gray-500"><Link to="/criar-curriculo">Criar CV</Link></li>
                <li className="px-2 py-1 hover:bg-gray-500"><Link to="/visualizar-curriculos">Visualizar CVs</Link></li>
            </ul>

            <div className="sm:hidden fixed bottom-4 right-4 z-50">
                <button className="flex items-center gap-2 rounded-full bg-gray-600 hover:text-red-300 transition" onClick={() => setOpen(!isOpen)}>
                    <GiFrenchFries className="w-5 h-5" />
                    <span className="hidden sm:inline">Entrar</span>
                </button>
            </div>
        </nav>
    )
}
