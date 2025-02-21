const BaseController = require('./BaseController');
const logger = require('../utils/logger');
const Usuario = require('../models/Usuario');

class UsuariosController extends BaseController {
    constructor() {
        super(Usuario);
    }
}

module.exports = new UsuariosController();