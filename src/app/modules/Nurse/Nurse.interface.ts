import { Types } from 'mongoose';

export type TNurse = {
  user: Types.ObjectId;
  name: string;
  email: string;

  address?: string;
  contactNo: string;
  sex: 'male' | 'female' | 'others';
  department: Types.ObjectId;
  doctor: Types.ObjectId;
  emergencyContact?: string;
  isBloodDonor: boolean;
  isDeleted: boolean;
};
