module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Movie.associate = models => {
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie', /* indica el nombre de la tabla pivot */
            foreignKey: 'movie_id', /* la q corresponde al modelo actual */
            otherKey: 'actor_id',
            timestamps: false,
        })
        Movie.belongsTo(models.Gente, {
            as: 'genre',
            foreignKey: 'genre_id',
        })
    }
    return Movie
};

/* Movie le pertenece a muchos, usamos belongsToMany.
Esto es asi porque desde el otro lado, en la tabla pivot,
le estamos diciendo hasMany(tiene muchos), pero no lo tenemos
que expresar en el modelo, porque sequelize ya lo hace por 
detras.

Para la relacion con genero, no iria la relacion hasOne, porque
es tiene uno, y la pelicula no tiene uno, es le pertenece a..
*/