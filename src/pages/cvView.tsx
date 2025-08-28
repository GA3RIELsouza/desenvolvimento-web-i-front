import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MOCKED_CVS } from '../../mockedData';

export default function CvView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const cvIndex = id ? parseInt(id, 10) : -1;
    const cv = MOCKED_CVS[cvIndex];

    if (!cv) {
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
                <h1 className="text-2xl font-bold text-red-500">
                    Currículo não encontrado
                </h1>
                <p className="text-gray-600">
                    O ID fornecido não corresponde a nenhum currículo.
                </p>
                <button
                    onClick={() => navigate('/visualizar-curriculos')}
                    className="mt-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Voltar para a Lista
                </button>
            </div>
        );
    }

    const handleEdit = () => {
        // Redireciona para o formulário no modo de edição.
        // Em um projeto real, você passaria o ID para o formulário carregar os dados.
        navigate(`/criar-curriculo?id=${cvIndex}`);
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir este currículo?")) {
            // Em um projeto real, aqui você faria a chamada para a API de exclusão.
            alert("Currículo excluído com sucesso (simulado).");
            navigate('/visualizar-curriculos');
        }
    };

    return (
        <div className="
            bg-white
            shadow-xl
            rounded-2xl
            p-10
            max-w-4xl
            w-full
            mx-auto
            flex
            flex-col
            items-center
            space-y-8
        ">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    {cv.personalInfo.fullName}
                </h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 p-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                    >
                        <FaEdit /> Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 p-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        <FaTrashAlt /> Excluir
                    </button>
                </div>
            </div>

            <hr className="border-1 w-full"></hr>

            {/* Seção de Informações Pessoais */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold border-b-2 pb-2">Informações Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <p><strong>Nome:</strong> {cv.personalInfo.fullName}</p>
                        <p><strong>Email:</strong> {cv.personalInfo.email}</p>
                        <p><strong>Telefone:</strong> {cv.personalInfo.phoneNumber}</p>
                    </div>
                    <div>
                        <p><strong>Endereço:</strong> {cv.personalInfo.address.street}, {cv.personalInfo.address.number}</p>
                        <p><strong>Bairro:</strong> {cv.personalInfo.address.neighborhood}</p>
                        <p><strong>Cidade/Estado:</strong> {cv.personalInfo.address.city}, {cv.personalInfo.address.state} - {cv.personalInfo.address.zipCode}</p>
                    </div>
                </div>
            </div>

            {/* Seção de Resumo Profissional */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold border-b-2 pb-2">Resumo Profissional</h2>
                <p className="text-gray-700">{cv.professionalSummary}</p>
            </div>

            {/* Seção de Experiência Profissional */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold border-b-2 pb-2">Experiência Profissional</h2>
                {cv.workExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600"><strong>{exp.company}</strong> | {exp.startDate} - {exp.endDate}</p>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                    </div>
                ))}
            </div>

            {/* Seção de Formação Acadêmica */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold border-b-2 pb-2">Formação Acadêmica</h2>
                {cv.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800">{edu.course}</h3>
                        <p className="text-gray-600"><strong>{edu.institution}</strong> | Conclusão: {edu.completionYear}</p>
                    </div>
                ))}
            </div>

            {/* Seção de Idiomas */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-semibold border-b-2 pb-2">Idiomas</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {cv.languages.map((lang, index) => (
                        <li key={index}>
                            <strong>{lang.language}:</strong> {lang.level}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
