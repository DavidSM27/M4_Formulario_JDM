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
        const { repetirEmail, ...coche} = datos;
        mutacion.mutate(coche);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>
                Agregar coche
            </h2>

            <label htmlFor="marca">Marca</label>
            <select
                id="marca"
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
        {...register("modelo")}
      />
      {errors.modelo && <p id="error-modelo" role="alert" className="error">{errors.modelo.message}</p>}

      <label htmlFor="anio">Año</label>
      <input
        id="anio"
        type="number"
        {...register("anio")}
      />
      {errors.anio && <p id="error-anio" role="alert" className="error">{errors.anio.message}</p>}

      <label htmlFor="precio">Precio (€)</label>
      <input
        id="precio"
        type="number"
        {...register("precio")}
      />
      {errors.precio && <p id="error-precio" role="alert" className="error">{errors.precio.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register("email")}
      />
      {errors.email && <p id="error-email" role="alert" className="error">{errors.email.message}</p>}

      <label htmlFor="repetirEmail">Repetir email</label>
      <input
        id="repetirEmail"
        type="email"
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