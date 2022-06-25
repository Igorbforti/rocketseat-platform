import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
const navigate = useNavigate() // uma funcao que serve para redirecinoar o usuário para outra tela sem clicar em links

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useCreateSubscriberMutation()

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault() // essa linha aqui é necessária pois as forms do HTML tem um comportamento padrao para levar o usuário para outra página quando submit, esse comando previne o default

        console.log(name, email)

        await createSubscriber({
            variables: {
                name, 
                email,
            }
        })

        navigate('/event')
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>

                </div>

                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
                    
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full" /*Quando receber o submit, ele executa a funcao*/>
                        <input
                            className="bg-gray-900 rounded px-5 h-14" 
                            type="text" 
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)} // toda vez que algo for digitado aqui, o valor vai ser chamado e colocado na variável setName
                        />
                        <input 
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text" 
                            placeholder="Digite seu email"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button 
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
        </div>
    )
}