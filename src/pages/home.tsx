import { FaReact, FaRocket } from "react-icons/fa"
import { PiReadCvLogo } from "react-icons/pi"
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    const goToBuilder = () => {
        navigate('/criar-curriculo')
    }

    const goToViewCvs = () => {
        navigate('/visualizar-curriculos')
    }

    return(
        <>
            <div className="
                bg-white
                shadow-x1
                rounded-2xl
                p-10
                max-w-2x1
                text-center">
                <PiReadCvLogo className="w-16 h-16 mx-auto my-5" />
                <div className="flex justify-center items-center text-center gap-5">
                    <h1 className="text-xl font-bold text-shadow-lg">
                        CV Builder
                    </h1>
                </div>
                

                <p className="text-sm mt-10">
                    Gere seu currículo de forma rápida e fácil!
                </p>

                <hr className="border-1 w-full"></hr>

                <p className="text-sm mt-10">
                    Ficou interessado?
                </p>

                <button
                    onClick={goToBuilder}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        border-2
                        rounded-lg
                        px-6
                        py-4
                        mt-2
                        mx-auto
                        bg-red-500
                        text-white
                        cursor-pointer
                        hover:bg-red-900
                        shadow-md
                        transition transform hover:scale-105">
                    <FaRocket /> Criar Meu Currículo
                </button>

                <button
                    onClick={goToViewCvs}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        border-2
                        rounded-lg
                        px-6
                        py-4
                        mt-2
                        mx-auto
                        bg-red-500
                        text-white
                        cursor-pointer
                        hover:bg-red-900
                        shadow-md
                        transition transform hover:scale-105">
                    <FaRocket /> Visualizar Currículos
                </button>
            </div>
        </>
    )
}
