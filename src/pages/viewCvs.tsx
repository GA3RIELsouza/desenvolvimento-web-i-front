import { FaFileAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
// import { MOCKED_CVS, formData } from '../../mockedData'

type formData = {
    id: number;
    personalInfo: {
        fullName: string;
        email: string;
        // Adicione outras propriedades se necessário
    };
    // Adicione outras seções do CV
}

export default function ViewCvs() {
    const navigate = useNavigate()
    const [cvs, setCvs] = useState<formData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/cvs");
                if (!response.ok) {
                    throw new Error("Erro ao buscar currículos.");
                }
                const data = await response.json();
                setCvs(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCvs();
    }, []);

    const goToBuilder = () => {
        navigate('/criar-curriculo')
    }

    const goToCvDetails = (id: number) => {
        // Redireciona para a página de visualização individual com o ID correto
        navigate(`/curriculo/${id}`)
    }

    if (isLoading) {
        return (
            <div className="text-center p-10">
                <p>Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="
            bg-white
            shadow-xl
            rounded-2xl
            p-10
            max-w-2xl
            w-full
            mx-auto
            text-center
            flex
            flex-col
            items-center
            space-y-6
        ">
            <h1 className="text-2xl font-bold text-gray-800">
                Visualizar Currículos
            </h1>
            <p className="text-sm text-gray-600">
                Visualize os últimos 3 CVs gerados!
            </p>

            <hr className="border-1 w-full my-4"></hr>

            <div className="w-full flex flex-col gap-4">
                {cvs.length > 0 ? (
                    cvs.map((cv: formData) => (
                        <div
                            key={cv.id}
                            onClick={() => goToCvDetails(cv.id)}
                            className="
                                flex items-center gap-4
                                p-4 border-2 border-gray-200 rounded-lg
                                hover:bg-gray-50 transition-colors duration-200
                                cursor-pointer
                            "
                        >
                            <FaFileAlt className="text-4xl text-blue-500" />
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900">{cv.personalInfo.fullName}</h3>
                                <p className="text-sm text-gray-600">{cv.personalInfo.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum currículo encontrado.</p>
                )}
            </div>

            <button
                onClick={goToBuilder}
                className="mt-4 p-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200"
            >
                Criar Novo Currículo
            </button>
        </div>
    )
}