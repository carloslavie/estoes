import { configureStore } from '@reduxjs/toolkit';
import proyectosReducer from '../reducers/proyectosReducer';

export default configureStore({
  reducer: {
    proyectos: proyectosReducer
  },
});
