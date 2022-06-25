import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { client } from "./lib/apollo"
import { Router } from "./Router"

function App() {
  return ( //o ApolloProvider e o BrowserRouter sao coisas importantes que precisam estar em volta da tag da página
    <ApolloProvider client={client}>
      <BrowserRouter> 
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
