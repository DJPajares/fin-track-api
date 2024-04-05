import {
  HydratedDocument,
  InferSchemaType,
  Schema,
  Types,
  model
} from 'mongoose';
import CONSTANTS from '../../utilities/constants';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, CONSTANTS.validations.category.name.required],
      unique: [true, CONSTANTS.validations.category.name.unique]
    },
    type: { type: Types.ObjectId, ref: 'Type' }
  },
  { timestamps: true }
);

const CategoryModel = model('Category', categorySchema);

type CategoryProps = HydratedDocument<InferSchemaType<typeof categorySchema>>;

export { CategoryModel, CategoryProps };
