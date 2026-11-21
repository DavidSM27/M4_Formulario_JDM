import { z } from "zod";

// Campos con un coche para reutilizar en el formulario
const campos = z.object({
  marca: z.string().min(1, "Elige una marca"),
  modelo: z.string().min(2, "Minimo 2 caracteres"),
  anio: z.coerce
    .number()
    .min(1960, "El año debe ser mayor a 1960")
    .max(new Date().getFullYear(), "El año no puede ser mayor al actual"),
  precio: z.coerce.number().min(1000, "Precio minimo 1000"),
  email: z.email("Email no valido"),
});

export const esquemaCoche = campos
  .extend({ repetirEmail: z.string() })
  .refine((d) => d.email === d.repetirEmail, {
    error: "Los emails no coinciden",
    path: ["repetirEmail"],
  });

export const esquemaLista = z.array(campos.extend({ id: z.string() }));
