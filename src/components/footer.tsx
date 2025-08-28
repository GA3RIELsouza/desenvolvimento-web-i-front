export default function Footer() {
    const date = new Date()
    const year = date.getFullYear()

    return(
        <footer className="bg-gray-700 text-white text-center py-6">
            <p className="text-lg">
                &copy; Todos direitos reservados.
                &reg; Marca registrada.
            </p>

            <p className="text-sm">
                UniSENAI, {year}
            </p>
        </footer>
    )
}
