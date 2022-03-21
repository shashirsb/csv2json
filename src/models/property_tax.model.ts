export default class PropertyTaxModel {
  constructor(
    public id?: number,
    public pid?: number,
    public financialYear?: string,
    public cPayable?: number,
    public createdAt?: Date,
    public createdBy?: string,
    public updatedAt?: Date,
    public updatedBy?: string,
   
  ) {}
}