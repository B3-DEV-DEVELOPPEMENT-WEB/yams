import './App.css'
// import Nav from './components/Nav.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home.jsx";
import Resultat from "./components/Result.jsx";
import Description from "./components/Description.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                {/*<Nav />*/}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/result" element={<Resultat />}></Route>
                    <Route path="/description" element={<Description />} />
                    <Route path="*" element={<h1>Error 404</h1>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
