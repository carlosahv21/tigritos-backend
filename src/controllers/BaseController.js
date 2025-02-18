



class BaseController {
    constructor(modelo) {
        this.modelo = modelo;
    }

    async obtenerTodos(req, res) {
        try {
            const { page = 1, limit = 10, search, filterField, filterValue } = req.query;
            const limitInt = parseInt(limit);
            const offset = (parseInt(page) - 1) * limitInt;

            const results = await this.modelo.obtenerTodos(limitInt, offset, search, filterField, filterValue);
            const total = await this.modelo.contarTodos(search, filterField, filterValue); // Pasa los filtros a la función contarTodos

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
            console.error(error);
            res.status(500).json({ message: 'Error al obtener registros' });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const id = req.params.id;
            const registro = await this.modelo.obtenerPorId(id); // Llama al modelo con el ID

            if (!registro) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }

            res.json(registro); // Envía la respuesta con el registro encontrado
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al obtener registro' });
        }
    }

    async crear(req, res) {
        try {
            const nuevoRegistro = await this.modelo.crear(req.body);
            res.status(201).json(nuevoRegistro);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al crear registro' });
        }
    }

    async actualizar(req, res) {
        try {
            const registroActualizado = await this.modelo.actualizar(req.params.id, req.body);
            res.json(registroActualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al actualizar registro' });
        }
    }

    async eliminar(req, res) {
        try {
            await this.modelo.eliminar(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al eliminar registro' });
        }
    }
}

module.exports = BaseController;