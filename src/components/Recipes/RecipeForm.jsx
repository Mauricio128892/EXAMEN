// src/components/Recipes/RecipeForm.jsx
import React, { useState, useEffect, useRef } from 'react'; // Importa useRef

const RecipeForm = ({ initialData = {}, onSubmit, isEditing = false, loading = false, error = null }) => {
  // Inicialización de estados
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [tiempoPreparacion, setTiempoPreparacion] = useState(initialData.tiempoPreparacion?.toString() || '');
  const [porciones, setPorciones] = useState(initialData.porciones?.toString() || '');
  const [imagenUrl, setImagenUrl] = useState(initialData.imagenUrl || '');
  const [ingredientes, setIngredientes] = useState(
    initialData.ingredientes && initialData.ingredientes.length > 0
      ? initialData.ingredientes
      : [{ nombre: '', cantidad: '' }]
  );
  const [instrucciones, setInstrucciones] = useState(
    initialData.instrucciones && initialData.instrucciones.length > 0
      ? initialData.instrucciones
      : ['']
  );
  const [formError, setFormError] = useState(null);

  // Usa useRef para almacenar una versión estable del initialData.id
  // Opcional: Esto es más robusto si initialData.id realmente no cambia
  // pero el objeto initialData sí se reconstruye.
  // Sin embargo, la causa principal suele ser el useEffect ejecutándose sin un ID estable.
  const initialDataIdRef = useRef(initialData.id);


  // useEffect para cargar o reiniciar el formulario basado en initialData
  // La dependencia clave aquí es initialData.id para evitar renders infinitos en modo CREATE.
  // En modo CREATE, initialData.id será undefined o null, y no cambiará,
  // por lo que este efecto no se disparará repetidamente.
  // En modo EDIT, initialData.id cambiará cuando cambiemos de una receta a otra.
  useEffect(() => {
    // Solo actualiza si initialData.id ha cambiado, o si es un nuevo formulario de creación
    // y estamos pasando de un estado con datos a uno sin datos (ej. navegar de editar a crear).
    // Usamos initialData.id para que React no considere '{}' diferente en cada render.
    if (initialData.id !== initialDataIdRef.current || (!initialData.id && initialDataIdRef.current)) {
      setNombre(initialData.nombre || '');
      setTiempoPreparacion(initialData.tiempoPreparacion?.toString() || '');
      setPorciones(initialData.porciones?.toString() || '');
      setImagenUrl(initialData.imagenUrl || '');
      setIngredientes(initialData.ingredientes && initialData.ingredientes.length > 0
        ? initialData.ingredientes
        : [{ nombre: '', cantidad: '' }]
      );
      setInstrucciones(initialData.instrucciones && initialData.instrucciones.length > 0
        ? initialData.instrucciones
        : ['']
      );
      setFormError(null); // Limpiar errores al cargar nuevos datos
      initialDataIdRef.current = initialData.id; // Actualiza la referencia para la próxima vez
    } else if (!initialData.id && !initialDataIdRef.current && isEditing) {
      // Caso especial si se inicia en modo edición sin ID (podría ser un error en la ruta)
      // Reinicia el formulario para evitar bucles.
       setNombre('');
       setTiempoPreparacion('');
       setPorciones('');
       setImagenUrl('');
       setIngredientes([{ nombre: '', cantidad: '' }]);
       setInstrucciones(['']);
       setFormError(null);
       initialDataIdRef.current = undefined; // Reinicia la referencia también
    }

  }, [initialData.id, initialData.nombre, initialData.tiempoPreparacion, initialData.porciones,
      initialData.imagenUrl, initialData.ingredientes, initialData.instrucciones, isEditing]); // Añadimos todas las dependencias usadas


  // Manejadores para Ingredientes
  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = { ...newIngredientes[index], [field]: value };
    setIngredientes(newIngredientes);
  };

  const addIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
  };

  const removeIngrediente = (index) => {
    if (ingredientes.length > 1) {
      const newIngredientes = ingredientes.filter((_, i) => i !== index);
      setIngredientes(newIngredientes);
    } else {
      setIngredientes([{ nombre: '', cantidad: '' }]);
    }
  };

  // Manejadores para Instrucciones
  const handleInstruccionChange = (index, value) => {
    const newInstrucciones = [...instrucciones];
    newInstrucciones[index] = value;
    setInstrucciones(newInstrucciones);
  };

  const addInstruccion = () => {
    setInstrucciones([...instrucciones, '']);
  };

  const removeInstruccion = (index) => {
    if (instrucciones.length > 1) {
      const newInstrucciones = instrucciones.filter((_, i) => i !== index);
      setInstrucciones(newInstrucciones);
    } else {
      setInstrucciones(['']);
    }
  };

  // Manejador del Envío del Formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Validación de campos obligatorios
    if (!nombre.trim()) {
      setFormError('El nombre de la receta es obligatorio.');
      return;
    }
    if (!tiempoPreparacion || isNaN(parseInt(tiempoPreparacion, 10)) || parseInt(tiempoPreparacion, 10) <= 0) {
      setFormError('El tiempo de preparación es obligatorio y debe ser un número positivo.');
      return;
    }
    if (!porciones || isNaN(parseInt(porciones, 10)) || parseInt(porciones, 10) <= 0) {
      setFormError('Las porciones son obligatorias y deben ser un número positivo.');
      return;
    }

    const cleanedIngredientes = ingredientes.filter(ing => ing.nombre.trim() && ing.cantidad.trim());
    const cleanedInstrucciones = instrucciones.filter(inst => inst.trim());

    if (cleanedIngredientes.length === 0) {
      setFormError('Debe añadir al menos un ingrediente completo.');
      return;
    }
    if (cleanedInstrucciones.length === 0) {
      setFormError('Debe añadir al menos un paso de instrucción completo.');
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      tiempoPreparacion: parseInt(tiempoPreparacion, 10),
      porciones: parseInt(porciones, 10),
      imagenUrl: imagenUrl.trim(),
      ingredientes: cleanedIngredientes,
      instrucciones: cleanedInstrucciones,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondaryBg p-8 rounded-lg shadow-xl max-w-2xl mx-auto border border-gray-700 text-textColor mb-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{isEditing ? 'Editar Receta' : 'Crear Nueva Receta'}</h2>
      {(formError || error) && <p className="text-redDanger text-center mb-4">{formError || error}</p>}

      <div className="mb-4">
        <label htmlFor="nombre" className="block text-textSecondary text-sm font-bold mb-2">Nombre de la Receta:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="tiempoPreparacion" className="block text-textSecondary text-sm font-bold mb-2">Tiempo de Preparación (minutos):</label>
          <input
            type="number"
            id="tiempoPreparacion"
            value={tiempoPreparacion}
            onChange={(e) => setTiempoPreparacion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
            required
            min="1"
          />
        </div>
        <div>
          <label htmlFor="porciones" className="block text-textSecondary text-sm font-bold mb-2">Porciones:</label>
          <input
            type="number"
            id="porciones"
            value={porciones}
            onChange={(e) => setPorciones(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
            required
            min="1"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="imagenUrl" className="block text-textSecondary text-sm font-bold mb-2">URL de la Imagen (Opcional):</label>
        <input
          type="url"
          id="imagenUrl"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-textSecondary text-sm font-bold mb-2">Ingredientes:</label>
        {ingredientes.map((ing, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-2 items-center">
            <input
              type="text"
              placeholder="Nombre del ingrediente"
              value={ing.nombre}
              onChange={(e) => handleIngredienteChange(index, 'nombre', e.target.value)}
              className="shadow appearance-none border rounded w-full sm:w-3/5 py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
              required
            />
            <input
              type="text"
              placeholder="Cantidad (ej. 2 tazas)"
              value={ing.cantidad}
              onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)}
              className="shadow appearance-none border rounded w-full sm:w-2/5 py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen"
              required
            />
            {ingredientes.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngrediente(index)}
                className="bg-redDanger hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition-colors shrink-0 w-full sm:w-auto"
                title="Eliminar este ingrediente"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngrediente}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors mt-2"
        >
          + Añadir Ingrediente
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-textSecondary text-sm font-bold mb-2">Instrucciones:</label>
        {instrucciones.map((inst, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-2 items-center">
            <textarea
              placeholder={`Paso ${index + 1}`}
              value={inst}
              onChange={(e) => handleInstruccionChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-textColor leading-tight focus:outline-none focus:shadow-outline focus:border-accentGreen resize-y"
              rows="3"
              required
            ></textarea>
            {instrucciones.length > 1 && (
              <button
                type="button"
                onClick={() => removeInstruccion(index)}
                className="bg-redDanger hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition-colors shrink-0 w-full sm:w-auto"
                title="Eliminar este paso"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addInstruccion}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors mt-2"
        >
          + Añadir Paso
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-accentGreen hover:bg-accentGreenHover text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors"
          disabled={loading}
        >
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar Receta' : 'Guardar Receta')}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
