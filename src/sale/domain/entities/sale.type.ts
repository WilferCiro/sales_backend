class User {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
}

export class Sale {
  _id?: string;
  name: string;
  total: number;
  tip_percent: number;
  products: {
    id: number;
    name: string;
    quantity: number;
    unit_price: number;
    discount_percent: number;
  }[];
  headquarter: {
    id: number;
    name: string;
    shop: {
      id: number;
      name: string;
    };
  };
  user: User;
  client: User;
  createdAt?: Date;
  updatedAt?: Date;
}
