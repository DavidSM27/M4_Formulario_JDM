import { useQuery } from "@tanstack/react-query";
import { obtenerCoches } from "./api.js";

export default function Lista() {
    const { data, isPending, isError, error, refetch} = useQuery({
        queryKey: ["coches"],
        queryFn: obtenerCoches,
        retry: false,
    });

    if (isPending) return <p>Cargando...</p>;
    if (isError) {
        return (
            <div role="alert">
                <p className="error">Error: {error.message}</p>
                <button onClick={() => refetch()}>Reintentar</button>
            </div>
        );
    }

    if (data.length === 0) return <p>No hay coches todavia en el garage</p>;

    return (
        <section>
            <h2>Garaje</h2>
            <ul>
                {data.map((c) => (
                    <li key={c.id}>
                        {c.marca} {c.modelo} ({c.anio}) - ${c.precio}
                    </li>
                ))}
            </ul>
        </section>
    );
}