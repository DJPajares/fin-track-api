import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const recurringLogSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
    amount: { type: Schema.Types.Decimal128, default: 0 },
    description: String,
    startDate: Date,
    endDate: Date,
    excludedDates: [Date]
  },
  {
    timestamps: true
  }
);

const RecurringLogModel = model('RecurringLog', recurringLogSchema);

type RecurringLogProps = HydratedDocument<
  InferSchemaType<typeof recurringLogSchema>
>;

export { RecurringLogModel, RecurringLogProps };
