import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esquemaCoche } from "./schema";
import { crearCoche } from "./api";

export default function Formulario() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaCoche),
    defaultValues: { marca: "", modelo: "", anio: "", precio: "", email: "", repetirEmail: "" },
  });

  const mutacion = useMutation({
    mutationFn: crearCoche,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["coches"] });
    },
  });

  function onSubmit(datos) {
    const coche = { ...datos };
    delete coche.repetirEmail;
    mutacion.mutate(coche);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Añadir coche</h2>

      <label htmlFor="marca">Marca</label>
      <select
        id="marca"
        aria-invalid={!!errors.marca}
        aria-describedby={errors.marca ? "error-marca" : undefined}
        {...register("marca")}
      >
        <option value="">-- Elige --</option>
        <option value="Nissan">Nissan</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Mazda">Mazda</option>
        <option value="Subaru">Subaru</option>
      </select>
      {errors.marca && <p id="error-marca" role="alert" className="error">{errors.marca.message}</p>}

      <label htmlFor="modelo">Modelo</label>
      <input
        id="modelo"
        aria-invalid={!!errors.modelo}
        aria-describedby={errors.modelo ? "error-modelo" : undefined}
        {...register("modelo")}
      />
      {errors.modelo && <p id="error-modelo" role="alert" className="error">{errors.modelo.message}</p>}

      <label htmlFor="anio">Año</label>
      <input
        id="anio"
        type="number"
        aria-invalid={!!errors.anio}
        aria-describedby={errors.anio ? "error-anio" : undefined}
        {...register("anio")}
      />
      {errors.anio && <p id="error-anio" role="alert" className="error">{errors.anio.message}</p>}

      <label htmlFor="precio">Precio (€)</label>
      <input
        id="precio"
        type="number"
        aria-invalid={!!errors.precio}
        aria-describedby={errors.precio ? "error-precio" : undefined}
        {...register("precio")}
      />
      {errors.precio && <p id="error-precio" role="alert" className="error">{errors.precio.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "error-email" : undefined}
        {...register("email")}
      />
      {errors.email && <p id="error-email" role="alert" className="error">{errors.email.message}</p>}

      <label htmlFor="repetirEmail">Repetir email</label>
      <input
        id="repetirEmail"
        type="email"
        aria-invalid={!!errors.repetirEmail}
        aria-describedby={errors.repetirEmail ? "error-repetirEmail" : undefined}
        {...register("repetirEmail")}
      />
      {errors.repetirEmail && <p id="error-repetirEmail" role="alert" className="error">{errors.repetirEmail.message}</p>}

      <button disabled={mutacion.isPending}>
        {mutacion.isPending ? "Guardando..." : "Guardar"}
      </button>

      {mutacion.isError && <p role="alert" className="error">{mutacion.error.message}</p>}
      {mutacion.isSuccess && <p role="status" className="ok">¡Coche guardado!</p>}
    </form>
  );
}
