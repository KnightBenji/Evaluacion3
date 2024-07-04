import React, {useState, useEffect} from 'react';

const FormularioGastos = ({agregarGasto, gastoEditado}) => {
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');
    const [valido, setValido] = useState('');

useEffect(() => {
    if (gastoEditado) {
        setDescripcion(gastoEditado.descripcion);
        setCategoria(gastoEditado.categoria);
        setMonto(gastoEditado.monto);
        setFecha(gastoEditado.fecha);
        }
    }, [gastoEditado]);
    
const Formulario = (envio) => {
    envio.preventDefault();
    if (!descripcion || !categoria || !monto || !fecha) {
        setError('Todos los campos son obligatorios');
        setValido('');
        return;
    }
    agregarGasto({descripcion, categoria, monto, fecha});
    setDescripcion('');
    setCategoria('');
    setMonto('');
    setFecha('');
    setError('');
    setValido('Gasto agregado correctamente');
    };

    return (
        <form onSubmit={Formulario} className="mb-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {valido && <div className="alert alert-success">{valido}</div>}
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoría</label>
                <input type="text" className="form-control" id="categoria" value={categoria}
                    onChange={(envio) => setCategoria(envio.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <input type="text" className="form-control" id="descripcion" value={descripcion}
                    onChange={(envio) => setDescripcion(envio.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="monto" className="form-label">Monto</label>
                <input type="number" className="form-control" id="monto" value={monto}
                    onChange={(envio) => setMonto(envio.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input type="date" className="form-control" id="fecha" value={fecha}
                    onChange={(envio) => setFecha(envio.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">
                {gastoEditado ? 'Guardar Cambios' : 'Agregar Gasto'}</button>
        </form>
    );
};

export default FormularioGastos;
