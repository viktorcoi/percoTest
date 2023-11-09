import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "../store/provider/StoreProvider";
import Layout from "../components/Layout";

const App = () => {
    
    return (
        <BrowserRouter>
            <StoreProvider>
               <Layout/>
            </StoreProvider>
        </BrowserRouter>
    )
}

export default App;