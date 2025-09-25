import { useState } from "react";
import { Input, Button } from "../../components";

function Graph() {
    const [imagesrc, setImagesrc] = useState(null);
    const [loadError, setLoadError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const minDateTime = "2020-01-01T00:00";
    const maxDateTime = "2020-12-31T23:59";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setLoadError("");
        setImagesrc(null);

        const formattedStartDate = startDate ? startDate.replace('T', ' ') : null;
        const formattedEndDate = endDate ? endDate.replace('T', ' ') : null;

        try {
            const response = await fetch('http://localhost:5000/api/generate-graph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error del servidor');
            }

            const imageUrl = '/TS-NOX-202.png?t=' + new Date().getTime();
            setImagesrc(imageUrl);

        } catch (error) {
            console.error("Fallo al generar el gráfico:", error);
            setLoadError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageError = () => {
        setLoadError("Fallo al cargar la imagen generada. Verifique la consola del servidor Flask.");
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-10 ">Generador de Gráficos NOX</h1>
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="start-date">Fecha y Hora de Inicio</label>
                        <Input
                            type="datetime-local"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={minDateTime}
                            max={endDate || maxDateTime}
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="end-date">Fecha y Hora de Término</label>
                        <Input
                            type="datetime-local"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || minDateTime}
                            max={maxDateTime}
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit" disabled={isLoading} text={isLoading ? "Generando..." : "Crear Gráfico"}></Button>
                </div>
            </form>
            <div className="mt-10">
                <Button type="submit" navigate="/" text={"Home"}></Button>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {isLoading && <p>Cargando gráfico...</p>}
                {loadError && <p style={{ color: 'red' }}>Error: {loadError}</p>}
                {imagesrc && !loadError && (
                    <img src={imagesrc} alt="Gráfico Generado de NOX" onError={handleImageError} style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
                )}
            </div>
        </div>
    )
}

export default Graph;