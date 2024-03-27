import { HydratedDocument, InferSchemaType } from 'mongoose';
import { typeSchema } from '../models/types';

export type TypeProps = HydratedDocument<InferSchemaType<typeof typeSchema>>;
