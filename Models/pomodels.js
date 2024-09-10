const mongoose = require('mongoose');

const taxDataSchema = new mongoose.Schema({
  TaxCalculationProcedure: String,
  TaxCode: String,
  TaxCodeName: String
});

const unitOfMeasureSchema = new mongoose.Schema({
  UnitOfMeasure: String,
  Description: String
});

const functionalAreaSchema = new mongoose.Schema({
  FunctionalArea: String,
  FunctionalAreaName: String
});


const CompanycodesSchema = new mongoose.Schema({
  ID:String,
  CompanyCode: String,
  CompanyCodeName: String,
  Supplier:String,
  cnt:String
});


const TaxData = mongoose.model('TaxData', taxDataSchema);
const UnitOfMeasure = mongoose.model('UnitOfMeasure', unitOfMeasureSchema);
const FunctionalArea = mongoose.model('FunctionalArea', functionalAreaSchema);
const Companycodes = mongoose.model('Companycodes', CompanycodesSchema);


module.exports = {
  TaxData,
  UnitOfMeasure,
  FunctionalArea,
  Companycodes
};
