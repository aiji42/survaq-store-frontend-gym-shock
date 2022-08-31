import { useReducer } from "react";
import { times } from "@/libs/times";
import { Product } from "@/libs/getProduct";

type Variant = Product["variants"][number];

export const useSkuSelectors = ({ skuLabel }: Pick<Product, "skuLabel">) => {
  const [selects, handleSku] = useReducer(
    (
      status: {
        label: string;
        variant: Variant;
        selected: { code: string; name: string };
      }[],
      action:
        | { type: "reset"; variant: Variant | undefined }
        | { type: "select"; index: number; value: string }
    ) => {
      if (action.type === "reset") {
        const { variant } = action;
        if (!variant) return [];
        const { code, name } = variant.skus[0];
        return times(variant.skuSelectable).map((index) => ({
          label: skuLabel ? skuLabel.replace(/#/g, String(index + 1)) : "",
          variant,
          selected: { code, name },
        }));
      }

      status[action.index].selected = {
        code: action.value,
        name:
          status[action.index].variant.skus.find(
            ({ code }) => code === action.value
          )?.name ?? "",
      };

      return status;
    },
    []
  );

  return { selects, handleSku };
};
