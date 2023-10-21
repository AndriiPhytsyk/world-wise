import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login.jsx";
import CitiesList from "./components/CitiesList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";


function App() {

    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage/>}/>
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="cities" element={<p></p>}/>
                        <Route path="app" element={<AppLayout/>}>
                            <Route index element={<Navigate replace to="cities"/>}/>
                            <Route path="cities" element={<CitiesList/>}/>
                            <Route path="cities/:id" element={<City/>}/>
                            <Route path="countries" element={<CountriesList/>}/>
                            <Route path="form" element={<Form/>}/>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
