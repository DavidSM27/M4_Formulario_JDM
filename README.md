# JDM Garage

Proyecto M4 . Full Contact Forms. Aplicacion para registrar coches JDM y ver el listado del garage.

# Como arrancarlo
```bash
npm install
cp .env.example .env
npx json-server db.json
npm run dev
```

## Tecnologias
He usado React + Vite . React Hook Form . Zod . TanStackQuery . json-server

## Estructura
- `db.json`: base de datos local (coches)
- `src/schema.js`: esquemas de Zod (formulario y respuesta de la API)
- `src/api.js`: peticiones `fetch`
- `src/Formulario.jsx`: formulario con React Hook Form + `useMutation`
- `src/Lista.jsx`: listado con `useQuery`

## Decisiones
- Los campos del coche se definen una sola vez en schema.js y se reutilizan para validar el formulario y la respuesta de la API
- `.refine` comprueba que el email y su repeticion coincidan
- Despues de guardar `invalidateQueries({ queryKey: ["coches"] })` refresca el listado sin tocar el estado a mano.
- La URL de la API esta en `VITE_API_URL`;
- He usado las opciones de aria-label para la correcta accesibilidad del proyecto

## Bonus: validar la respuesta de la API
`obtenerCoches` hace `safeParse` de lo que devuelve la API. Para comprobarlo: en `db.json` se puede hacer poniendo `"anio": "abc"`
en un coche y recarga. La lista muestra un error en lugar de pintar datos rotos.

## Uso de IA

**Herramienta:** Claude y claude code.

##Que delegue:**:
- La primera version del proeyecto para saber la organizacion del mismo y ver que estructura debia desarrollar.
- El CSS para darle una estetica similar a la del nuevo GTA ya que no es en lo que se centra el proyecto
- La explicacion de los errores o dudas que me iban surgiendo

**Prompts clave:**
1. Con la teoria que te he dado y las instrucciones de que debe contener el proyecto quiero que me des la estructura del proyecto que debo desarrollar.
2. Simplifica el codigo en la parte de la base de datos, ya que el metodo que estas llevando a cabo no se corresponde con lo que dimos en clase usando npx y db.json

## Autopsia

**Que fallo:** la IA en un principio queria orientar el proyecto usando json-server. Yo decidi arrancar la API con `npx json-server db.json` que usa la version nueva y nos genera los id como texto. Aparte que era la tecnica vista en clase.

**Como lo detecte:**
- El `select` vacio lo vi directamente en el navegador

**Como lo arregle:**
- Cree el `.env` y reinicie Vite
- Puse `id: z.string()` en el esquema de la respuesta y los `id` de `db.json` como texto.

**Que aprendi:** que Vite solo lee el `.env` al arrancar, que `fetch` no falla con respuestas HTML ni codigos 404 y que no me puedo fiar del criterio de la IA siempre.
