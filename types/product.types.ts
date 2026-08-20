import { Types } from "mongoose";

interface Images {
  isPrimary: boolean;
  url: string;
  publicId: string;
}

export interface Product {
  productTitle: string;
  category: Types.ObjectId | string;
  sku: string;
  images?: Images[];
  description: string;
  quantity: number;
  currency: string;
  price: number;
  addedBy?: Types.ObjectId | string;
}
