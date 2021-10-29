const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "admin",
    port: 5432,
    database: "repertorio"
    });

    const getAll = async () => {
        try{
            const result= await pool.query('SELECT * FROM repertorio');
            return result.rows;
        }catch(e){
            console.log(e);
            return [];
        }
    }

    const insertar = async (cancion) => {
        try{
            const result= await pool.query('INSERT INTO repertorio(cancion, artista, tono) VALUES($1, $2, $3) RETURNING *',
            values=[cancion.cancion, cancion.artista, cancion.tono]);
            return result.rows[0];
        }catch(e){
            console.log(e);
            return null;
        }
    }

    const eliminar = async (id) => {
        try{
            const result= await pool.query('DELETE FROM repertorio WHERE id=$1  RETURNING *',
            values=[id]);
            return result.rows[0];
        }catch(e){
            console.log(e);
            return null;
        }
    }
    const modificar = async (cancion) => {
        try{
            const result= await pool.query('UPDATE repertorio SET cancion=$1, artista=$2, tono=$3 WHERE id=$4 RETURNING *',
            values=[cancion.cancion, cancion.artista, cancion.tono,cancion.id]);
            return result.rows[0];
        }catch(e){
            console.log(e);
            return null;
        }
    }
    module.exports = {getAll, insertar,eliminar,modificar};
    