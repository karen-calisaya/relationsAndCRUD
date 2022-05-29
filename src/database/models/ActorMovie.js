module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        actor_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        movie_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };
    let config = {
        tableName: 'actor_movie',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ActorMovie = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

/* trabajamos en la tabla pivot que hará de intermediario. Primero,
definimos el tipo de dato que tienen esas columnas de la tabla.
*/

    return ActorMovie
};
/* la tabla pivot, el modelo, esta bien creado. Lo que sucede
es que a veces sequelize te pide que crees la tabla pivot 
y generes la asociacion desde las puntas(movies y actors), desde 
los lados con belongToMany */

/* aca el belongsToMany, la asociacion, no va, iria en los modelos movie y actor
seria en las dos puntas*/