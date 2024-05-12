/** PHYSICAL HOLDER */
interface PhysicalHolder {
  login: Login;
  url: string;
  holder: Holder;
  newHolder: Holder;
}

interface Holder {
  personalInformations: PersonalInformations;
  address: Address;
  status: Status;
  communication: Communication;
  facturation: Facturation;
}

interface Facturation {
  period: string;
  mode: string;
  exoneration: string;
  exonerationTwo: string;
  suspension: string;
  warning: string;
  impositionPeriod: string;
}

interface Communication {
  domicilPhone: string;
  domicilEmail: string;
  workPhone: string;
  workEmail: string;
  portablePhone: string;
  website: string;
  fax: string;
}

interface Status {
  active: string;
  inactive: string;
}

interface Address {
  country: string;
  locality: string;
  street: string;
  complement: string;
  validFrom: string;
  validTo: string;
  commune: string;
  secondCommune: string;
}

interface PersonalInformations {
  title: string;
  birthDate: string;
}

interface Login {
  username: string;
  password: string;
}
/** ----------------- */
export interface HoldersId {
  physical: Physical[];
  moral: Physical[];
  simplified: Physical[];
}

interface Physical {
  id: string;
  canton: string;
}

export default PhysicalHolder;