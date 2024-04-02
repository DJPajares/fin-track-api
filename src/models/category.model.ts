import {
  HydratedDocument,
  InferSchemaType,
  Schema,
  Types,
  model
} from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: Types.ObjectId, ref: 'Type' }
});

const CategoryModel = model('Category', categorySchema);

type CategoryProps = HydratedDocument<InferSchemaType<typeof categorySchema>>;

export { CategoryModel, CategoryProps };
