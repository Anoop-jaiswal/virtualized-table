import { faker } from "@faker-js/faker";
import type { User } from "../types/userTypes";

faker.seed(124);

export function createRandomUser() {
  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sexType(),
    prefix: faker.person.prefix(),
    suffix: faker.person.suffix(),
    age: faker.number.int({ max: 100, min: 1 }),

    email: faker.internet.email(),
    phone: faker.phone.number(),
    altPhone: faker.phone.number(),
    avatar: faker.image.avatar(),
    website: faker.internet.url(),
    ipV4: faker.internet.ipv4(),
    ipV6: faker.internet.ipv6(),
    macAddress: faker.internet.mac(),

    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    countryCode: faker.location.countryCode(),
    zipCode: faker.location.zipCode(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    timeZone: faker.location.timeZone(),

    birthDate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    lastLogin: faker.date.recent(),
    subscriptionStart: faker.date.past(),
    subscriptionEnd: faker.date.future(),
    licenseIssued: faker.date.past(),
    licenseExpiry: faker.date.future(),

    jobTitle: faker.person.jobTitle(),
    jobType: faker.person.jobType(),
    company: faker.company.name(),
    department: faker.commerce.department(),
    industry: faker.company.catchPhrase(),
    education: faker.word.words(3),
    university: faker.company.name(),

    creditCardNumber: faker.finance.creditCardNumber(),
    creditCardCVV: faker.finance.creditCardCVV(),
    iban: faker.finance.iban(),
    bic: faker.finance.bic(),
    currency: faker.finance.currencyCode(),
    bitcoinAddress: faker.finance.bitcoinAddress(),
    amount: faker.finance.amount(),

    productName: faker.commerce.productName(),
    productCategory: faker.commerce.department(),
    productPrice: faker.commerce.price(),
    color: faker.color.human(),
    material: faker.commerce.productMaterial(),
    sku: faker.string.alphanumeric(8),

    password: faker.internet.password(),
    uuid: faker.string.uuid(),
    fileName: faker.system.fileName(),
    mimeType: faker.system.mimeType(),
    semver: faker.system.semver(),
    networkProtocol: faker.internet.protocol(),
    urlSlug: faker.lorem.slug(),

    chemicalElement: faker.science.chemicalElement().name,
    unitName: faker.science.unit().name,
    booleanFlag: faker.datatype.boolean(),
    rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
    votes: faker.number.int({ min: 0, max: 5000 }),

    shortBio: faker.lorem.sentence(),
    paragraph: faker.lorem.paragraph(),
    quote: faker.lorem.sentence(),
    hashtag: faker.word.sample(),

    vehicle: faker.vehicle.vehicle(),
    licensePlate: faker.vehicle.vin(),
    airline: faker.airline.airline().name,
    flightNumber: faker.airline.flightNumber(),
    musicGenre: faker.music.genre(),
    movieTitle: faker.word.words(2),
  };
}

export const USERS: User[] = faker.helpers
  .multiple(createRandomUser, { count: 2000 })
  .map((data, index) => ({ ...data, rowId: index }));
