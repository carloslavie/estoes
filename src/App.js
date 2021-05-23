import React from 'react';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListadoProyectos from './components/ListadoProyectos';
import NuevoProyecto from './components/NuevoProyecto';
import EditarProyecto from './components/EditarProyecto';


function App() {
  return (
    <Router>
            <Header/>
      <Switch>
              <Route exact path="/" component={ListadoProyectos} />
              <Route exact path="/proyectos/nuevo" component={NuevoProyecto} />
              <Route exact path="/proyectos/editar/:id" component={EditarProyecto} />
            </Switch>
    </Router>
    
  );
}

export default App;
