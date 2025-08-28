import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookForm/resolvers/yup"

export default function Contact() {
    type formData = {
        question: string
        email: string
    }

    const schema = yup.object().shape({
        question: yup
            .string()
            .required("É necessário informar a pergunta.")
            .min(3, "A pergunta deve ter pelo menos três caracteres."),
        email: yup
            .string()
            .email("E-mail inválido.")
            .required("É necessário informar o e-mail.")
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formData>({
        resolver: yupResolver(schema)
    })
    
    const onSubmit = (data: formData) => {
        alert(`question=\"${data.question}\"\nemail=\"${data.email}\"`)
    }

    return(
        <>
            <h1 className="text-xl font-bold text-shadow-lg">
                Entre em contato conosco
            </h1>

            <p className="text-sm mt-10">
                Será um prazer responder suas perguntas
            </p>

            <hr className="border-1 w-full"></hr>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1">
                    <label htmlFor="question" className="text-sm mt-10">
                        Digite sua pergunta abaixo:
                    </label>
                    <input type="text" {...register("question")} className="border-2 rounded-lg px-2 py-1 mt-2 bg-white text-black"></input>
                    <p className="text-sm mt-1 bg-red-900 text-white">
                        {errors.question?.message as any}
                    </p>
                </div>

                <div className="grid grid-cols-1">
                    <label htmlFor="email" className="text-sm mt-10">
                        Informe seu e-mail:
                    </label>
                    <input type="text" {...register("email")} className="border-2 rounded-lg px-2 py-1 mt-2 bg-white text-black"></input>
                    <p className="text-sm mt-1 bg-red-900 text-white">
                        {errors.email?.message as any}
                    </p>
                </div>
                
                <input type="submit" className="mt-4 p-4 bg-green-800 text-white"></input>
            </form>
        </>
    )
}
