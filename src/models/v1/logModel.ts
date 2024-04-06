import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const logSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
    amount: { type: Schema.Types.Decimal128, default: 0 },
    date: Date
  },
  {
    timestamps: true
  }
);

const LogModel = model('Log', logSchema);

type LogProps = HydratedDocument<InferSchemaType<typeof logSchema>>;

export { LogModel, LogProps };
