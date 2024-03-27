import { model, Schema } from 'mongoose';

const typeSchema = new Schema({
  name: { type: String, required: true }
});

const TypeModel = model('Type', typeSchema);

export { typeSchema, TypeModel };
