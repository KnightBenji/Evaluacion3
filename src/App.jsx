import React, {useState, useEffect} from 'react';
import FormularioGastos from './Components/FormularioGastos';
import ListaGastos from './Components/ListaGastos';

let idCounter = 0;

const idUnico = () => {
  const timestamp = Date.now();
  idCounter += 1;
  return `${timestamp}-${idCounter}`;
};

const App = () => {
  const [gastos, setGastos] = useState(() => {
    const gastosGuardados = localStorage.getItem('gastos');
    return gastosGuardados ? JSON.parse(gastosGuardados) : [];
});

const [gastoEditado, setGastoEditado] = useState(null);

const agregarGasto = (gasto) => {
  if (gastoEditado) {
    const nuevosGastos = gastos.map((g) =>
      g.id === gastoEditado.id ? { ...gasto, id: g.id } : g
    );
    setGastos(nuevosGastos);
    localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
    setGastoEditado(null); 
  } else {
    const nuevosGastos = [...gastos, { ...gasto, id: idUnico() }];
    setGastos(nuevosGastos);
    localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
  }
};

return (
  <div className="container mt-5">
    <h1 className="text-center">Seguimiento de Gastos</h1>
    <FormularioGastos agregarGasto={agregarGasto} gastoEditado={gastoEditado} />
    <ListaGastos gastos={gastos} setGastos={setGastos} setGastoEditado={setGastoEditado} />
  </div>
  );
};

export default App;
