import { esquemaLista } from "./schema.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCoches() {
  const r = await fetch(`${API_URL}/coches`);
  if (!r.ok) throw new Error("Error" + r.status);
  const json = await r.json();

  const resultado = esquemaLista.safeParse(json);
  if (!resultado.success)
    throw new Error("La API ha davuelto datos incorrectos");
  return resultado.data;
}

export async function crearCoche(coche) {
  const r = await fetch(`${API_URL}/coches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coche),
  });
  if (!r.ok) throw new Error("No se pudo guardar el coche");
  return r.json();
}
