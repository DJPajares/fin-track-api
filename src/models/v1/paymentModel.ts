import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true
    },
    amount: { type: Schema.Types.Decimal128, default: 0 },
    date: Date
  },
  {
    timestamps: true
  }
);

const PaymentModel = model('Payment', paymentSchema);

type PaymentProps = HydratedDocument<InferSchemaType<typeof paymentSchema>>;

export { PaymentModel, PaymentProps };
