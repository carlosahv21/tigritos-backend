const db = require('../db/db'); // Importa la instancia de la conexión
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Usuario {
    static async obtenerTodos(limit, offset, search, filterField, filterValue) {
        let query = db('usuarios')
            .select('usuarios.*')
            .orderBy('usuario_id', 'asc');

        if (search) {
            query.where('usuarios.nombre', 'like', `%${search}%`);
        }
        if (filterField && filterValue) {
            query.where(filterField, filterValue);
        }

        return query.limit(limit).offset(offset);
    }

    static async contarTodos() {
        return db('usuarios').count('* as count').first();
    }

    static async obtenerPorId(id) {
        const usuario = await db('usuarios').where({ usuario_id: id }).first();
        if (usuario) {
            delete usuario.deleted;
            return usuario;
        }
        return null;
    }

    static async actualizar(id, datos) {
        try{
            const validatedData = await Usuario.validar(datos, false);
            
            const duplicado = await Usuario.validarDuplicado(validatedData.email);

            if (duplicado) {
                const errorDuplicado = new Error('El email del usuario ya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }

            validatedData.contrasena = await Usuario.hashPassword(validatedData.contrasena);            
            await db('usuarios').where({ usuario_id: id }).update(validatedData);
            return Usuario.obtenerPorId(id);
        }catch(error){
            throw error;
        }
    }

    static async eliminar(id) {
        return db('usuarios').where({ usuario_id: id }).del();
    }

    static async crear(datos) {
        try {
            const validatedData = await Usuario.validar(datos, true);

            const duplicado = await Usuario.validarDuplicado(validatedData.email);

            if (duplicado) {
                const errorDuplicado = new Error('El email del usuario ya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }
            
            validatedData.contrasena = await Usuario.hashPassword(validatedData.contrasena);            
            
            const insert = await db('usuarios').insert(validatedData);
            return Usuario.obtenerPorId(insert[0]);
        } catch (error) {
            throw error;
        }
    }

    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    static async validar(usuario, esCreacion) {
        const schema = Joi.object({
            nombre: Joi.string().required(),
            email: Joi.string().email().required(),
            tipo_usuario: Joi.string().required(),
            telefono: Joi.number().required(),
            contrasena: esCreacion ? Joi.string().required() : Joi.string().allow(null, ''),
        });

        const { error, value } = schema.validate(usuario);

        if (error) {
            const errorValidacion = new Error(error.details[0].message);
            errorValidacion.codigo = 'VALIDACION';
            throw errorValidacion;
        }

        return value;
    }

    static async validarDuplicado(email) {
        const registro = await db('usuarios').where('email', email).first();
        if (registro) {
            return true;
        }
        return false;
    }

    static async iniciarSesion(email, contrasena) {
        try {
            const usuario = await db('usuarios').where({ email }).first();

            if (!usuario) {
                throw new Error('Credenciales inválidas');
            }

            const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

            if (!contrasenaValida) {
                throw new Error('Credenciales inválidas');
            }

            const token = await Usuario.generarToken(usuario);
            const refreshToken = await Usuario.generarRefreshToken(usuario);
            return { token, refreshToken, usuario };
        } catch (error) {
            throw error;
        }
    }

    static async generarToken(usuario) {
        return jwt.sign({ usuario_id: usuario.usuario_id, rol: usuario.rol }, 'secret_key', { expiresIn: '1h' });
    }

    static async generarRefreshToken(usuario) {
        return jwt.sign({ usuario_id: usuario.usuario_id, rol: usuario.rol }, 'secret_key_refresh', { expiresIn: '7d' });
    }

    static async renovarToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, 'secret_key_refresh');
            const usuario = await db('usuarios').where({ usuario_id: decoded.usuario_id }).first();
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            const token = await Usuario.generarToken(usuario);
            return { token };
        } catch (error) {
            throw new Error('Refresh token inválido');
        }
    }
}

module.exports = Usuario;