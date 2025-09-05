import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IMaskInput } from "react-imask"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export default function CvBuilder() {
    type formData = {
        id?: number;
        personalInfo: {
            fullName: string
            email: string
            phoneNumber: string
            address: {
                zipCode: string
                street: string
                number: string
                neighborhood: string
                city: string
                state: string
            }
        }
        professionalSummary: string
        workExperience: {
            position: string
            company: string
            startDate: string
            endDate: string
            description: string
        }[]
        education: {
            course: string
            institution: string
            completionYear: string
        }[]
        languages: {
            language: string
            level: "Básico" | "Intermediário" | "Avançado" | "Fluente"
        }[]
    }

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const cvId = query.get("id");

    const [isLoading, setIsLoading] = useState(true);

    const schema = yup.object().shape({
        personalInfo: yup.object().shape({
            fullName: yup
                .string()
                .required("É necessário informar o nome.")
                .min(3, "O nome deve ter pelo menos 3 caracteres."),
            email: yup
                .string()
                .email("E-mail inválido.")
                .required("É necessário informar o e-mail."),
            phoneNumber: yup
                .string()
                .required("É necessário informar o telefone.")
                .transform((value) => value.replace(/\D/g, ''))
                .min(10, "O telefone deve ter pelo menos 10 dígitos, incluindo o DDD."),
            address: yup.object().shape({
                zipCode: yup.string().required("É necessário informar o CEP."),
                street: yup.string().required("É necessário informar a rua."),
                number: yup.string().required("É necessário informar o número."),
                neighborhood: yup.string().required("É necessário informar o bairro."),
                city: yup.string().required("É necessário informar a cidade."),
                state: yup.string().required("É necessário informar o estado."),
            })
        }),
        professionalSummary: yup.string().required("É necessário informar um resumo profissional."),
        workExperience: yup.array().of(
            yup.object().shape({
                position: yup.string().required("Campo obrigatório."),
                company: yup.string().required("Campo obrigatório."),
                startDate: yup.string().required("Campo obrigatório."),
                endDate: yup.string().required("Campo obrigatório."),
                description: yup.string().required("Campo obrigatório."),
            })
        ).required("É necessário adicionar pelo menos uma experiência profissional."),
        education: yup.array().of(
            yup.object().shape({
                course: yup.string().required("Campo obrigatório."),
                institution: yup.string().required("Campo obrigatório."),
                completionYear: yup.string().required("Campo obrigatório."),
            })
        ).required("É necessário adicionar pelo menos uma formação acadêmica."),
        languages: yup.array().of(
            yup.object().shape({
                language: yup.string().required("Campo obrigatório."),
                level: yup.string().oneOf(["Básico", "Intermediário", "Avançado", "Fluente"]).required("Campo obrigatório."),
            })
        ).required("É necessário adicionar pelo menos um idioma."),
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<formData>({
        resolver: yupResolver(schema),
        defaultValues: {
            personalInfo: {
                fullName: "",
                email: "",
                phoneNumber: "",
                address: {
                    zipCode: "",
                    street: "",
                    number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                },
            },
            professionalSummary: "",
            workExperience: [{ position: "", company: "", startDate: "", endDate: "", description: "" }],
            education: [{ course: "", institution: "", completionYear: "" }],
            languages: [{ language: "", level: "Básico" }],
        }
    })

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
        control,
        name: "workExperience",
    })

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education",
    })

    const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
        control,
        name: "languages",
    })

    useEffect(() => {
        if (cvId) {
            const fetchCv = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/cvs/${cvId}`);
                    if (response.ok) {
                        const data = await response.json();
                        reset(data); // Preenche o formulário com os dados do CV
                    }
                } catch (error) {
                    console.error("Erro ao buscar CV para edição:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCv();
        } else {
            setIsLoading(false);
        }
    }, [cvId, reset]);

    const onSubmit = async (data: formData) => {
        const method = cvId ? 'PUT' : 'POST';
        const url = cvId ? `http://localhost:3001/api/cvs/${cvId}` : "http://localhost:3001/api/cvs";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(`CV ${cvId ? 'atualizado' : 'criado'} com sucesso!`);
                navigate("/visualizar-curriculos");
            } else {
                alert(`Erro ao ${cvId ? 'atualizar' : 'criar'} CV.`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na requisição. Verifique o console.");
        }
    }

    const inputClasses = "border-2 rounded-lg px-2 py-1 mt-2 bg-white text-black w-full";
    const errorClasses = "text-sm mt-1 bg-red-900 text-white p-1 rounded";

    if (isLoading) {
        return <div className="text-center p-10">Carregando formulário...</div>;
    }

    return(
        <>
            <h1 className="text-2xl font-bold text-shadow-lg text-center my-6">
                {cvId ? 'Edite seu CV' : 'Crie seu CV'}
            </h1>

            <hr className="border-1 w-full my-4"></hr>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
                {/* O restante do formulário permanece o mesmo */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="fullName" className="text-sm">Nome completo</label>
                            <input type="text" {...register("personalInfo.fullName")} className={inputClasses} />
                            {errors.personalInfo?.fullName && <p className={errorClasses}>{errors.personalInfo.fullName.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm">E-mail</label>
                            <input type="email" {...register("personalInfo.email")} className={inputClasses} />
                            {errors.personalInfo?.email && <p className={errorClasses}>{errors.personalInfo.email.message}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="phoneNumber" className="text-sm">Telefone</label>
                            <Controller
                                name="personalInfo.phoneNumber"
                                control={control}
                                render={({ field }) => (
                                    <IMaskInput
                                        {...field}
                                        mask="(00) 00000-0000"
                                        lazy={false} // Mantém a máscara sempre visível
                                        radix="."
                                        className={inputClasses}
                                        placeholder="(xx) xxxxx-xxxx"
                                        onAccept={(value) => field.onChange(value)}
                                    />
                                )}
                            />
                            {errors.personalInfo?.phoneNumber && <p className={errorClasses}>{errors.personalInfo.phoneNumber.message}</p>}
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label htmlFor="zipCode" className="text-sm">CEP</label>
                            <input type="text" {...register("personalInfo.address.zipCode")} className={inputClasses} />
                            {errors.personalInfo?.address?.zipCode && <p className={errorClasses}>{errors.personalInfo.address.zipCode.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="street" className="text-sm">Rua</label>
                            <input type="text" {...register("personalInfo.address.street")} className={inputClasses} />
                            {errors.personalInfo?.address?.street && <p className={errorClasses}>{errors.personalInfo.address.street.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="number" className="text-sm">Número</label>
                            <input type="text" {...register("personalInfo.address.number")} className={inputClasses} />
                            {errors.personalInfo?.address?.number && <p className={errorClasses}>{errors.personalInfo.address.number.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="neighborhood" className="text-sm">Bairro</label>
                            <input type="text" {...register("personalInfo.address.neighborhood")} className={inputClasses} />
                            {errors.personalInfo?.address?.neighborhood && <p className={errorClasses}>{errors.personalInfo.address.neighborhood.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="city" className="text-sm">Cidade</label>
                            <input type="text" {...register("personalInfo.address.city")} className={inputClasses} />
                            {errors.personalInfo?.address?.city && <p className={errorClasses}>{errors.personalInfo.address.city.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="state" className="text-sm">Estado</label>
                            <input type="text" {...register("personalInfo.address.state")} className={inputClasses} />
                            {errors.personalInfo?.address?.state && <p className={errorClasses}>{errors.personalInfo.address.state.message}</p>}
                        </div>
                    </div>
                </div>
                
                <hr className="border-1 w-full my-4"></hr>

                {/* Resumo Profissional */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Resumo Profissional</h2>
                    <label htmlFor="professionalSummary" className="text-sm">Resumo</label>
                    <textarea {...register("professionalSummary")} className={`${inputClasses} h-32`}></textarea>
                    {errors.professionalSummary && <p className={errorClasses}>{errors.professionalSummary.message}</p>}
                </div>
                
                <hr className="border-1 w-full my-4"></hr>

                {/* Experiência Profissional */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Experiência Profissional</h2>
                    {workFields.map((item, index) => (
                        <div key={item.id} className="border-2 p-4 rounded-lg mb-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor={`workExperience.${index}.position`} className="text-sm">Cargo</label>
                                    <input type="text" {...register(`workExperience.${index}.position`)} className={inputClasses} />
                                    {errors.workExperience?.[index]?.position && <p className={errorClasses}>{errors.workExperience[index].position.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`workExperience.${index}.company`} className="text-sm">Empresa</label>
                                    <input type="text" {...register(`workExperience.${index}.company`)} className={inputClasses} />
                                    {errors.workExperience?.[index]?.company && <p className={errorClasses}>{errors.workExperience[index].company.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`workExperience.${index}.startDate`} className="text-sm">Data de Início</label>
                                    <input type="date" {...register(`workExperience.${index}.startDate`)} className={inputClasses} />
                                    {errors.workExperience?.[index]?.startDate && <p className={errorClasses}>{errors.workExperience[index].startDate.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`workExperience.${index}.endDate`} className="text-sm">Data de Fim</label>
                                    <input type="date" {...register(`workExperience.${index}.endDate`)} className={inputClasses} />
                                    {errors.workExperience?.[index]?.endDate && <p className={errorClasses}>{errors.workExperience[index].endDate.message}</p>}
                                </div>
                            </div>
                            <label htmlFor={`workExperience.${index}.description`} className="text-sm">Descrição das atividades</label>
                            <textarea {...register(`workExperience.${index}.description`)} className={`${inputClasses} h-24`}></textarea>
                            {errors.workExperience?.[index]?.description && <p className={errorClasses}>{errors.workExperience[index].description.message}</p>}
                            <div className="flex justify-end">
                                <button type="button" onClick={() => removeWork(index)} className="mt-2 p-2 bg-red-600 text-white rounded">
                                    Remover Experiência
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendWork({ position: "", company: "", startDate: "", endDate: "", description: "" })}
                        className="mt-4 p-2 bg-blue-600 text-white rounded w-full"
                    >
                        Adicionar Experiência
                    </button>
                    {errors.workExperience && <p className={errorClasses}>É necessário adicionar pelo menos uma experiência profissional.</p>}
                </div>
                
                <hr className="border-1 w-full my-4"></hr>

                {/* Formação Acadêmica */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Formação Acadêmica</h2>
                    {educationFields.map((item, index) => (
                        <div key={item.id} className="border-2 p-4 rounded-lg mb-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label htmlFor={`education.${index}.course`} className="text-sm">Curso</label>
                                    <input type="text" {...register(`education.${index}.course`)} className={inputClasses} />
                                    {errors.education?.[index]?.course && <p className={errorClasses}>{errors.education[index].course.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`education.${index}.institution`} className="text-sm">Instituição</label>
                                    <input type="text" {...register(`education.${index}.institution`)} className={inputClasses} />
                                    {errors.education?.[index]?.institution && <p className={errorClasses}>{errors.education[index].institution.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`education.${index}.completionYear`} className="text-sm">Ano de Conclusão</label>
                                    <input type="text" {...register(`education.${index}.completionYear`)} className={inputClasses} />
                                    {errors.education?.[index]?.completionYear && <p className={errorClasses}>{errors.education[index].completionYear.message}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => removeEducation(index)} className="mt-2 p-2 bg-red-600 text-white rounded">
                                    Remover Formação
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendEducation({ course: "", institution: "", completionYear: "" })}
                        className="mt-4 p-2 bg-blue-600 text-white rounded w-full"
                    >
                        Adicionar Formação
                    </button>
                    {errors.education && <p className={errorClasses}>É necessário adicionar pelo menos uma formação acadêmica.</p>}
                </div>
                
                <hr className="border-1 w-full my-4"></hr>

                {/* Idiomas */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Idiomas</h2>
                    {languageFields.map((item, index) => (
                        <div key={item.id} className="border-2 p-4 rounded-lg mb-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor={`languages.${index}.language`} className="text-sm">Idioma</label>
                                    <input type="text" {...register(`languages.${index}.language`)} className={inputClasses} />
                                    {errors.languages?.[index]?.language && <p className={errorClasses}>{errors.languages[index].language.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor={`languages.${index}.level`} className="text-sm">Nível</label>
                                    <select {...register(`languages.${index}.level`)} className={inputClasses}>
                                        <option value="Básico">Básico</option>
                                        <option value="Intermediário">Intermediário</option>
                                        <option value="Avançado">Avançado</option>
                                        <option value="Fluente">Fluente</option>
                                    </select>
                                    {errors.languages?.[index]?.level && <p className={errorClasses}>{errors.languages[index].level.message}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => removeLanguage(index)} className="mt-2 p-2 bg-red-600 text-white rounded">
                                    Remover Idioma
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendLanguage({ language: "", level: "Básico" })}
                        className="mt-4 p-2 bg-blue-600 text-white rounded w-full"
                    >
                        Adicionar Idioma
                    </button>
                    {errors.languages && <p className={errorClasses}>É necessário adicionar pelo menos um idioma.</p>}
                </div>

                <input type="submit" value={cvId ? "Salvar Alterações" : "Gerar CV"} className="mt-8 p-4 bg-green-800 text-white font-bold rounded-lg cursor-pointer w-full" />
            </form>
        </>
    )
}