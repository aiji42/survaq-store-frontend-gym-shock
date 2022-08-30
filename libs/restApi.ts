type Foundation = {
  fieldId: string;
  totalPrice: number;
  closeOn: string;
  supporter?: number;
};

type Schedule = {
  year: number;
  month: number;
  term: "early" | "middle" | "late";
  text: string;
  texts: string[];
  subText: string;
};

type Rule = {
  fieldId: string;
  leadDays: number;
  cyclePurchase: {
    value: "monthly" | "triple";
    label: string;
  };
  schedule: Schedule;
};

type Variant = {
  fieldId: string;
  variantId: string;
  variantName: string;
  skus: { code: string; name: string; subName: string }[];
  skuSelectable: number;
};

export type ProductFromApi = {
  id: string;
  productCode: string;
  productName: string;
  variants?: Array<Variant>;
  skuLabel?: string;
  foundation: Foundation;
  rule: Rule;
};

export const getProductFromApi = async (
  productId: string | number
): Promise<ProductFromApi> => {
  return fetch(
    `https://survaq-shopify-frontend.vercel.app/api/products/${productId}`
  ).then((res) => res.json());
};
