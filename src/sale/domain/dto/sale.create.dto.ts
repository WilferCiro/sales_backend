class User {
  id?: number;
  name?: string;
  document?: string;
  email?: string;
}

export class DomainCreateSaleDto {
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
  client?: User;
}
