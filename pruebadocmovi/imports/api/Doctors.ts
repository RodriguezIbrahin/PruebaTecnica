import { Mongo } from 'meteor/mongo';
import { Doctor } from "../ui/statics/Validate";


export const DoctorCollection = new Mongo.Collection<Doctor>('doctor');
