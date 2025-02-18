const BaseController = require('./BaseController');
const Tigrito = require('../models/Tigrito.js');

class TigritosController extends BaseController {
    constructor() {
        super(Tigrito);
    }
}

module.exports = new TigritosController();