//comportamiento de la base de datos con express (instalar npm pg)
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'cursos',
    port: 5432
});
//insertar nuevos cursos
async function nuevoCurso(nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(
          `INSERT INTO cursos(nombre,nivel,fecha, duracion) values('${nombre}', '${nivel}', '${fecha}', '${duracion}') RETURNING*;`);
        return result.rows
    } catch (e) {
        return e
    }
}

//exportar el documento
async function getCursos(){
    try{
        const result = await pool.query(`SELECT * FROM cursos;`);
        return result.rows
    }catch(e){
        return e;
    }
}

//editar el documento
async function editCurso(id, nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(`UPDATE cursos SET nombre= '${nombre}', nivel= '${nivel}', fecha='${fecha}', duracion='${duracion}' WHERE id='${id}' RETURNING*;`)
        return result.rows 
    } catch (e) {
        return (e)
    }
}

//borrar curso del documento
async function deleteCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id='${id}'`);
        return result.rowCount
    } catch (e) {
        return (e)
    }
}
module.exports={nuevoCurso, getCursos, editCurso, deleteCurso}