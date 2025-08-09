export type User = {
  // Identification
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

  // Contact
  email: string;
  phone: string;
  altPhone: string;
  avatar: string;
  website: string;
  ipV4: string;
  ipV6: string;
  macAddress: string;

  // Location
  street: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timeZone: string;

  // Dates
  birthDate: Date;
  registeredAt: Date;
  lastLogin: Date;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  licenseIssued: Date;
  licenseExpiry: Date;

  // Work & Education
  jobTitle: string;
  jobType: string;
  company: string;
  department: string;
  industry: string;
  education: string;
  university: string;

  // Finance
  creditCardNumber: string;
  creditCardCVV: string;
  iban: string;
  bic: string;
  currency: string;
  bitcoinAddress: string;
  amount: string;

  // Commerce & Product
  productName: string;
  productCategory: string;
  productPrice: string;
  color: string;
  material: string;
  sku: string;

  // Internet & System
  password: string;
  uuid: string;
  fileName: string;
  mimeType: string;
  semver: string;
  networkProtocol: string;
  urlSlug: string;

  // Science / Misc
  chemicalElement: string;
  unitName: string;
  booleanFlag: boolean;
  rating: number;
  votes: number;

  // Text content
  shortBio: string;
  paragraph: string;
  quote: string;
  hashtag: string;

  // Miscellaneous
  vehicle: string;
  licensePlate: string;
  airline: string;
  flightNumber: string;
  musicGenre: string;
  movieTitle: string;

  // Extra runtime field for table row tracking
  rowId?: number;
};
