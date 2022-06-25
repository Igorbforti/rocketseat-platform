import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns' 
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
} // conceito de interface de novo, entao pega os elementos que forem variáveis para poder modificar eles com JS

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string}>()

    const isLessonAvailable = isPast(props.availableAt)
    const availableAtFormatted = format(props.availableAt, "EEEE' • 'd ' de ' MMMM ' • ' k'h'mm", {
        locale: ptBR
    }) // essa formatacao toda é usada com essa biblioteca de datas. Muito legal saber disso, basta entender como funciona

    const isActiveLesson = slug == props.slug

    return ( // a classe group aqui foi colocada para que o card todo da aula seja possível de ser alterado no hover. Entao no hover da div ali foi colocado o group-hover para ele identificar que vai ter hover em todo o grupo
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableAtFormatted}
            </span>

            <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': isActiveLesson
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? ( // muito legal ver funcionando um if dessa forma, modificando a aparencia de algo dependendo de como estiver
                        <span className={classNames('text-sm font-medium flex items-center gap-2', {
                            'text-white': isActiveLesson,
                            'text-blue-500': !isActiveLesson,
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={classNames('text-xs rounded py-[2px] px-2 text-white border border-green-300 font-bold', {
                        'border-white': isActiveLesson,
                        'border-green-300': !isActiveLesson,
                    })}>
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={classNames('mt-5 block', {
                    'text-white': isActiveLesson,
                    'text-gray-200': !isActiveLesson,
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}