const mongoose=require('mongoose');
const Joi=require('joi');

const customerschema=new mongoose.Schema({
  isGold:{
      type:Boolean,
      required:true,
  },
  name:{
      type:String,
      required:true,
  },
  phone:{
      type:Number,
      required:true,
  },
});

const Customer=mongoose.model("Customer",customerschema);

function validatecustomer(customers)
{
    const schema= Joi.object({
      isGold:Joi.required(),
      name:Joi.required(),
      phone:Joi.required().min(10),
    });
    return schema.validate(customers);
}

module.exports.Customer=Customer;
module.exports.validatecustomer=validatecustomer;