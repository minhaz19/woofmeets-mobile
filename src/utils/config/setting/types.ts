export interface basicInfoType {
  profileImage: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  countryId: number | null;
  name: string;

  dob: string;
}

export interface contactType {
  phone: string;
  emergencyContactName: string;
  email: string;
  emergencyContactPhone: string;
}
