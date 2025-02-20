const BaseController = require('./BaseController');
const Categoria = require('../models/Categoria');

class CategoriasController extends BaseController {
    constructor() {
        super(Categoria);
    }

}

module.exports = new CategoriasController();