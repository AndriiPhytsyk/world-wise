import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="cities" element={<p></p>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route path="cities" element={<p>List of cities</p>}/>
                    <Route path="countries" element={<p>Countries</p>}/>
                    <Route path="cities" element={<p>Form</p>}/>
                 </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
