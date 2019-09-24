let mongoose = require('mongoose')

let infoSchema = new mongoose.Schema({
  cpf: String,
  cartao: Array,
  infos: Array,
  transacoes: Array
})

module.exports = mongoose.model('Info', infoSchema)