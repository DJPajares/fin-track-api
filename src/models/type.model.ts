import { model, Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const typeSchema = new Schema({
  name: { type: String, required: true }
});

const TypeModel = model('Type', typeSchema);

type TypeProps = HydratedDocument<InferSchemaType<typeof typeSchema>>;

export { TypeModel, TypeProps };
