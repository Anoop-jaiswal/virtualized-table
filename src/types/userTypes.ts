export type User = {
  id: number;
  userId: string;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male";
  prefix: string;
  suffix: string;
  age: number;

  email: string;
  phone: string;
  altPhone: string;
  avatar: string;
  website: string;
  ipV4: string;
  ipV6: string;
  macAddress: string;

  street: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timeZone: string;

  birthDate: Date;
  registeredAt: Date;
  lastLogin: Date;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  licenseIssued: Date;
  licenseExpiry: Date;

  jobTitle: string;
  jobType: string;
  company: string;
  department: string;
  industry: string;
  education: string;
  university: string;

  creditCardNumber: string;
  creditCardCVV: string;
  iban: string;
  bic: string;
  currency: string;
  bitcoinAddress: string;
  amount: string;

  productName: string;
  productCategory: string;
  productPrice: string;
  color: string;
  material: string;
  sku: string;

  password: string;
  uuid: string;
  fileName: string;
  mimeType: string;
  semver: string;
  networkProtocol: string;
  urlSlug: string;

  chemicalElement: string;
  unitName: string;
  booleanFlag: boolean;
  rating: number;
  votes: number;

  shortBio: string;
  paragraph: string;
  quote: string;
  hashtag: string;

  vehicle: string;
  licensePlate: string;
  airline: string;
  flightNumber: string;
  musicGenre: string;
  movieTitle: string;

  rowId?: number;
};
