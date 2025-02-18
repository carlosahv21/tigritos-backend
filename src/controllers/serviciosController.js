const BaseController = require('./BaseController');
const Servicio = require('../models/Servicio');

class ServiciosController extends BaseController {
    constructor() {
        super(Servicio);
    }

}

module.exports = new ServiciosController();