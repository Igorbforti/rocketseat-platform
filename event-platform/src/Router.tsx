import { Route, Routes } from "react-router-dom";
import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";

export function Router() {
    return ( // essa parte define as rotas para acessar cada página. A terceira rota ali foi colocado como :slug, pois o valor dessa rota é da API, entao aqui ele já entende isso e redireciona para a página correta
        <Routes> 
            <Route path="/" element={<Subscribe />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/lesson/:slug" element={<Event />} />
        </Routes>
    )
}