export interface ObjectFormData {
  name: string;
  contract: string;
  designation: string;
  contractor: string;
  code: string;
  date: string;
  customer: string;
}

export interface TableItem {
  id: string;
  name: string;
  type: string;
  routeDefined: boolean;
  profileDefined: boolean;
  scale: string;
}