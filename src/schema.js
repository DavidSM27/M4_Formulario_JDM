import { z } from "zod";

export const esquemaCoche = z
  .object({
    marca: z.string().min(1, "Elige una marca"),
    modelo: z.string().min(2, "Minimo 2 caracteres"),
    anio: z
      .string()
      .min(1, "El anio es obligatorio")
      .pipe(
        z.coerce
          .number()
          .int("El anio debe ser un numero entero")
          .min(1960, "Anio max 1960")
          .max(2026, "Anio max 2026"),
      ),
    precio: z
      .string()
      .min(1, "El precio es obligatorio")
      .pipe(
        z.coerce
          .number()
          .int("El precio debe ser un numero entero")
          .min(1000, "Precio minimo 1000")
          .max(100000, "Precio maximo 100000"),
      ),
    email: z.email("Email no valido"),
    repetirEmail: z.string(),
  })
  .refine((d) => d.email === d.repetirEmail, {
    error: "Los emails no coinciden",
    path: ["repetirEmail"],
  });

export const esquemaLista = z.array(
  z.object({
    id: z.string(),
    marca: z.string(),
    modelo: z.string(),
    anio: z.number().int(),
    precio: z.number().int(),
    email: z.email(),
  }),
);
