import { createSlice } from '@reduxjs/toolkit';

    const proyect = [
        { id:1, name:"Diseñar pagina Web", productManager:"Tomas Colombo", assigned:"Pablo Etchebarne", status:"enabled", avatar:"https://reqres.in/img/faces/1-image.jpg", asigImage:"https://reqres.in/img/faces/6-image.jpg"},
        { id:2, name:"Unificar estilos de diseño", productManager:"Tomas Colombo", assigned:"Ricardo Moyo", status:"enabled", avatar:"https://reqres.in/img/faces/1-image.jpg", asigImage:"https://reqres.in/img/faces/5-image.jpg"},
        { id:3, name:"Definir Colores", productManager:"Pedro Alfonzo", assigned:"Mauro Rojas", status:"disabled", avatar:"https://reqres.in/img/faces/2-image.jpg", asigImage:"https://reqres.in/img/faces/4-image.jpg"},
        { id:4, name:"Aplicar endpoints de la API a las rutas", productManager:"Tomas Colombo", assigned:"Marcelo Araujo", status:"enabled", avatar:"https://reqres.in/img/faces/1-image.jpg", asigImage:"https://reqres.in/img/faces/3-image.jpg"}
    ]

export const proyectosReducer = createSlice ({
    name: 'proyectos',
        initialState:{
            proyectos: [],
            proyecto: null,
            loading:null,
            error:null  
        },

        reducers:{
            obtenerProyectos: (state, action) =>{
                state.proyectos = action.payload;
                state.loading = false
            },
            agregarProyectos: (state, action) =>{
                state.testimonios.push(action.payload);
                state.loading = false                                
            },
            proyectosFetching: (state) =>{
                state.loading = true
            },
            proyectoError: (state, action) =>{
                state.error = action.payload;
                state.loading = false
            },
            actualizarproyecto: (state, action) =>{
                state.testimonios = state.testimonios.map(testimonio => testimonio.id === action.payload.id ? action.payload : testimonio);
                state.loading = false
                
            },
            proyectoActual: (state, action) =>{
                state.testimonio = action.payload
            },
            eliminarProyecto: (state, action)=>{
                
                state.testimonios = state.testimonios.filter(testimonio=>testimonio.id !== action.payload)                
            }
        }
})

export const { obtenerProyectos, agregarProyectos, proyectosFetching, proyectoError, actualizarProyecto, proyectoActual, eliminarProyecto } = proyectosReducer.actions;

export const obtenerProyectosApi =  () => async dispatch => {
        dispatch(proyectosFetching())
    try {
        const respuesta = proyect;
                    
        dispatch(obtenerProyectos(respuesta))
        
    } catch (error) {
        dispatch(proyectoError(error.message));
    }

};

 export const agregarProyectosApi = proyecto => async dispatch => {
     dispatch(proyectosFetching())
     try {               
         const respuesta = await fetch('API', {
             method: 'POST', 
             body: JSON.stringify(proyecto), 
             headers:{
               'Content-Type': 'application/json'
             }})
         const resultado = await respuesta.json();
                
         dispatch(agregarProyectos(proyecto))

      } catch (error) {
         dispatch(proyectoError(error.message));
     }
  }


  export const actualizarProyectoApi = proyecto => async dispatch => {
    
     dispatch(proyectosFetching())
    try {
       
        const resultado = await fetch(`https://reqres.in/api/users/${proyecto.id}`, {
            method: 'PUT',
            body: JSON.stringify(proyecto), 
            headers:{
              'Content-Type': 'application/json'
            }})

         dispatch(actualizarProyecto(proyecto))

    } catch (error) {
     dispatch(proyectoError(error.message));
 }
 }

 export const obtenerProyectoActual = proyecto => dispatch => {
    
     dispatch(proyectoActual(proyecto))
 }

 export const eliminarProyectoApi = id => async dispatch =>{
    
     try {
         const resultado = await fetch(`https://reqres.in/api/users/${id}`, {
             method: 'DELETE',
             })
                                           
         dispatch(eliminarProyecto(id))

     } catch (error) {
     dispatch(proyectoError(error.message));
 }
 }   
export default proyectosReducer.reducer;

