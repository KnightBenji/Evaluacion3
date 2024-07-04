import React, {useState} from 'react';

const ListaGastos = ({ gastos, setGastos, setGastoEditado }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [criterioBusqueda, setCriterioBusqueda] = useState('descripcion');
    const [ordenAscendente, setOrdenAscendente] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const gastosPorPagina = 4;


    const Eliminar = (id) => {
        const nuevosGastos = gastos.filter((gasto) => gasto.id !== id);
        setGastos(nuevosGastos);
        localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
    };


    const Editar = (id) => {
        const gastoParaEditar = gastos.find((gasto) => gasto.id === id);
        setGastoEditado(gastoParaEditar);
    };

    const gastosFiltrados = gastos.filter((gasto) => {
        if (criterioBusqueda === 'descripcion') {
            return gasto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase());
        } else if (criterioBusqueda === 'categoria') {
            return gasto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase());
        } else if (criterioBusqueda === 'monto') {
            return gasto.monto.toString().includes(terminoBusqueda);
        } return false;
    });

    const gastosOrdenados = gastosFiltrados.sort((a, b) => {
        if (a.categoria.toLowerCase() < b.categoria.toLowerCase()) {
            return ordenAscendente ? -1 : 1;
        }
        if (a.categoria.toLowerCase() > b.categoria.toLowerCase()) {
            return ordenAscendente ? 1 : -1;
        } return 0;
    });

    const indexUltimoGasto = paginaActual * gastosPorPagina;
    const indexPrimerGasto = indexUltimoGasto - gastosPorPagina;
    const gastosPaginaActual = gastosOrdenados.slice(indexPrimerGasto, indexUltimoGasto);
    const numeroPaginas = Math.ceil(gastosOrdenados.length / gastosPorPagina);

    return (
        <div>
            <div className="mb-3">
                <select className="form-select mb-3"value={criterioBusqueda}
                    onChange={(palabra) => setCriterioBusqueda(palabra.target.value)}>
                        <option value="descripcion">Descripción</option>
                        <option value="categoria">Categoría</option>
                        <option value="monto">Monto</option>
                </select>
            <input type="text" className="form-control" placeholder={`Buscar por ${criterioBusqueda}`}
                value={terminoBusqueda} onChange={(i) => setTerminoBusqueda(i.target.value)} />
            <button className="btn btn-primary mt-3" onClick={() => setOrdenAscendente(!ordenAscendente)}>
                Ordenar por Nombre ({ordenAscendente ? 'Ascendente' : 'Descendente'})</button>
            </div>
            <div className="row">
                {gastosPaginaActual.map((gasto) => (
                <div key={gasto.id} className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{gasto.categoria}</h5>
                                <p className="card-text">
                                {gasto.descripcion} - ${gasto.monto} - {gasto.fecha}
                                </p>
                                <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => Editar(gasto.id)}>Editar</button>
                                <button className="btn btn-danger btn-sm"
                                    onClick={() => Eliminar(gasto.id)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            <nav>
                <ul className="pagination justify-content-center mt-3">
                    {Array.from({length: numeroPaginas}, (_, index) => (
                    <li key={index} className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPaginaActual(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
        );
    };

export default ListaGastos;
