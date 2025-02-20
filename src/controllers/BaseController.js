const logger = require("../utils/logger");

class BaseController {
    constructor(modelo) {        
        this.modelo = modelo;
        this.modeloName = modelo.name;
    }

    async obtenerTodos(req, res) {
        try {
            const { page = 1, limit = 10, search, filterField, filterValue } = req.query;
            const limitInt = parseInt(limit);
            const offset = (parseInt(page) - 1) * limitInt;

            const results = await this.modelo.obtenerTodos(limitInt, offset, search, filterField, filterValue);

            if (!results) {
                logger.error(`Error al obtener todos los ${this.modeloName}`);
                res.status(404).json({ mensaje: 'No se encontraron registros' });
            }

            const total = await this.modelo.contarTodos(search, filterField, filterValue); 
            res.json({
                data: results,
                meta: {
                    page: parseInt(page),
                    limit: limitInt,
                    total: total.count,
                    pages: Math.ceil(total.count / limitInt)
                }
            });

        } catch (error) {
            logger.error(`Error al obtener todos los ${this.modeloName}: ${error.message}`);
            res.status(500).json({ message: 'Error al obtener registros' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const registro = await this.modelo.obtenerPorId(id);

            if (!registro) {
                logger.error(`Error al obtener ${this.modeloName} por ID: ${id}`);
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.json(registro);
        } catch (error) {
            logger.error(`Error al obtener ${this.modeloName} por ID: ${error.message}`);
            res.status(500).json({ mensaje: 'Error al obtener registro' });
        }
    }

    async crear(req, res) {
        try {
            const nuevoRegistro = await this.modelo.crear(req.body);
            if (nuevoRegistro) {
                logger.info(`Se ha creado un ${this.modeloName}: ${JSON.stringify(nuevoRegistro)}`);
                res.status(201).json(nuevoRegistro);
            } else {
                res.status(400).json({ mensaje: 'No se pudo crear el registro' });
            }
        } catch (error) {
            if (error.codigo === 'DUPLICADO') {
                logger.warn(`Error al crear ${this.modeloName}: ${error.message}`);
                return res.status(409).json({ message: error.message });
            }
            
            if (error.codigo === 'VALIDACION') {
                logger.warn(`Error al crear ${this.modeloName}: ${error.message}`);
                return res.status(400).json({ mensaje: error.message });
            }

            logger.error(`Error al crear ${this.modeloName}: ${error.message}`);
            res.status(500).json({ message: 'Error al crear registro' });
        }
    }

    async actualizar(req, res) {
        try {
            const registroActualizado = await this.modelo.actualizar(req.params.id, req.body);
            if (registroActualizado) {
                logger.info(`Se ha actualizado un ${this.modeloName}: ${JSON.stringify(registroActualizado)}`);
                res.json(registroActualizado);
            } else {
                res.status(404).json({ mensaje: `No se encontró el ${this.modeloName} para actualizar`});
            }
        } catch (error) {
            if (error.codigo === 'VALIDACION') {
                logger.warning(`Error al actualizar ${this.modeloName}: ${error.message}`);
                return res.status(400).json({ mensaje: error.message });
            }
            logger.error(`Error al actualizar ${this.modeloName}: ${error.message}`);
            res.status(500).json({ mensaje: 'Error al actualizar registro' });
        }
    }

    async eliminar(req, res) {
        try {
            const resultado =await this.modelo.eliminar(req.params.id);
            if (resultado > 0) {
                logger.info(`Servicio eliminado un ${this.modeloName}: ${JSON.stringify(resultado)}`);
                res.status(200).json({ mensaje: `${this.modeloName} eliminado correctamente` });
            } else {
                logger.error(`Error no se encontró el ${this.modeloName}`);
                res.status(404).json({ mensaje: `No se encontró el ${this.modeloName} para eliminar`});
            }
        } catch (error) {
            logger.error(`Error al eliminar ${this.modeloName}: ${error.message}`);
            res.status(500).json({ mensaje: `Error al eliminar ${this.modeloName}` });
        }
    }
}

module.exports = BaseController;