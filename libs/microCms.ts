import { createClient } from "microcms-js-sdk";

type Foundation = {
  fieldId: string;
  totalPrice: number;
  closeOn: string;
  supporter?: number;
};

type Rule = {
  fieldId: string;
  leadDays: number;
  cyclePurchase: {
    value: "monthly" | "triple";
    label: string;
  };
  customSchedules: Array<{
    beginOn: string;
    endOn: string;
    deliverySchedule: string;
    purchaseSchedule: string;
  }>;
};

type Variant = {
  fieldId: string;
  variantId: string;
  variantName: string;
  skus: { code: string; name: string; subName: string }[];
  skuSelectable: number;
};

export type ProductOnMicroCms = {
  id: string;
  productCode: string;
  productName: string;
  variants: Array<Variant>;
  skuLabel?: string;
  foundation: Foundation;
  rule: Rule;
};

export const cmsClient = createClient({
  serviceDomain: "survaq-shopify",
  apiKey: process.env.MICROCMS_API_TOKEN ?? "",
});

export const getProductOnMicroCms = async (
  productId: string | number
): Promise<ProductOnMicroCms> => {
  const { id, productCode, productName, variants, skuLabel, foundation, rule } =
    await cmsClient.getListDetail<ProductOnMicroCms>({
      endpoint: "products",
      contentId: String(productId),
    });

  return { id, productCode, productName, variants, skuLabel, foundation, rule };
};
