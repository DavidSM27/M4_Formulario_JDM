import { useQuery } from "@tanstack/react-query";
import { obtenerCoches } from "./api.js";

export default function Lista() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["coches"],
        queryFn: obtenerCoches,
    });

    if (isPending) return <p>Cargando...</p>;
    if (isError) return <p>Error: {error.message}</p>;

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