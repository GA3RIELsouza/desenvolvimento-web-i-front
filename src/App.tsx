import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import CvBuilder from './pages/cvBuilder'
import ViewCvs from './pages/viewCvs'
import CvView from './pages/cvView'

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="
                flex
                flex-col
                items-center
                text-center
                py-8
                bg-gradient-to-r
                from-red-400
                to-purple-400
                min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/criar-curriculo" element={<CvBuilder />} />
                    <Route path="/visualizar-curriculos" element={<ViewCvs />} />
                    <Route path="/curriculo/:id" element={<CvView />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
