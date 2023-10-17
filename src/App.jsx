import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login.jsx";
import CitiesList from "./components/CitiesList.jsx";
import {useEffect, useState} from "react";
import CountriesList from "./components/CountriesList.jsx";

const BASE_URL = "http://localhost:9000"

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log()
    useEffect(function () {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                setCities(data)
            } catch {
                alert('There was an error loading data')
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="cities" element={<p></p>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<CitiesList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities" element={<CitiesList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities" element={<p>Form</p>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
