import { ProductFromApi } from "@/libs/restApi";
import Script from "next/script";
import { useEffect, useMemo, useReducer, useState } from "react";

type Props = Required<
  Pick<ProductFromApi, "variants" | "skuLabel" | "rule">
> & {
  productId: number;
};

type ProductObject = {
  selectedVariantTrackingInfo: { id: string };
  setCustomAttributes: (arg: Array<{ key: string; value: string }>) => void;
};

export const Cart = ({ variants, rule, skuLabel, productId }: Props) => {
  const [selectingVariantId, setVariantId] = useState<string | null>(null);
  const variant = useMemo(() => {
    return variants.find(({ variantId }) => variantId === selectingVariantId);
  }, [selectingVariantId, variants]);
  const selects = Array(variant?.skuSelectable ?? 0)
    .fill(0)
    .map((_, index) => {
      const label = skuLabel
        ? skuLabel?.replace(/#/g, String(index + 1))
        : null;

      return { label, skus: variant?.skus ?? [] };
    });

  const [selectedSkus, handleSku] = useReducer(
    (
      s: { code: string; name: string }[],
      a:
        | { type: "reset"; count: number }
        | { type: "select"; index: number; value: string }
    ) => {
      if (a.type === "reset") {
        if (a.count === 0) {
          return variant?.skus ?? [];
        }

        return Array(a.count)
          .fill(0)
          .map((_, index) => ({
            code: selects[index].skus[0].code,
            name: selects[index].skus[0].name,
          }));
      }

      s[a.index] = {
        code: a.value,
        name:
          selects[a.index].skus.find(({ code }) => code === a.value)?.name ??
          "",
      };

      return s;
    },
    []
  );
  useEffect(() => {
    handleSku({ type: "reset", count: variant?.skuSelectable ?? 0 });
  }, [variant]);

  useEffect(() => {
    window.ShopifyCustomAttribute = [
      ...selectedSkus.map(({ name }, index) => ({
        key: selects[index].label ?? "",
        value: name,
      })),
      {
        key: "_skus",
        value: JSON.stringify(selectedSkus.map(({ code }) => code)),
      },
      {
        key: "配送予定",
        value: `${rule.schedule.text}(${rule.schedule.subText})`,
      },
      {
        key: "_delivery_schedule",
        value: `${rule.schedule.year}-${String(rule.schedule.month).padStart(
          2,
          "0"
        )}-${rule.schedule.term}`,
      },
    ];
  }, [
    rule.schedule.month,
    rule.schedule.subText,
    rule.schedule.term,
    rule.schedule.text,
    rule.schedule.year,
    selectedSkus,
    selects,
  ]);

  return (
    <>
      {selects.map((select, index) => (
        <label key={index}>
          {select.label}
          <select
            onChange={(e) =>
              handleSku({ type: "select", value: e.target.value, index })
            }
            defaultValue={selectedSkus[index]?.code}
          >
            {select.skus.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
      ))}
      <Script
        src="/buybutton.js"
        strategy="afterInteractive"
        onLoad={() => {
          const client = window.ShopifyBuy.buildClient({
            domain: "survaq.myshopify.com",
            storefrontAccessToken:
              process.env.NEXT_PUBLIC_STORE_FRONT_ACCESS_TOKEN,
          });
          window.ShopifyBuy.UI.init(client).createComponent("product", {
            id: productId,
            node: document.getElementById("product-component-1658452708280"),
            moneyFormat: "%C2%A5%7B%7Bamount_no_decimals%7D%7D",
            options: {
              product: {
                iframe: false,
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "calc(25% - 20px)",
                      "margin-left": "20px",
                      "margin-bottom": "50px",
                    },
                  },
                  button: {
                    "font-size": "17px",
                    "padding-top": "16.5px",
                    "padding-bottom": "16.5px",
                    ":hover": {
                      "background-color": "#a4514e",
                    },
                    "background-color": "#b65a57",
                    ":focus": {
                      "background-color": "#a4514e",
                    },
                    "padding-left": "50px",
                    "padding-right": "50px",
                  },
                  quantityInput: {
                    "font-size": "17px",
                    "padding-top": "16.5px",
                    "padding-bottom": "16.5px",
                  },
                },
                contents: {
                  img: false,
                  title: false,
                  price: false,
                },
                text: {
                  button: "カートに追加",
                },
                events: {
                  afterRender: function (product: ProductObject) {
                    const id = product.selectedVariantTrackingInfo.id.replace(
                      "gid://shopify/ProductVariant/",
                      ""
                    );
                    setVariantId(id);
                  },
                  addVariantToCart: (product: ProductObject) => {
                    console.log(window.ShopifyCustomAttribute);
                    if (window.ShopifyCustomAttribute) {
                      product.setCustomAttributes(
                        window.ShopifyCustomAttribute
                      );
                    }
                  },
                },
              },
              productSet: {
                styles: {
                  products: {
                    "@media (min-width: 601px)": {
                      "margin-left": "-20px",
                    },
                  },
                },
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true,
                },
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px",
                    },
                  },
                  button: {
                    "font-size": "17px",
                    "padding-top": "16.5px",
                    "padding-bottom": "16.5px",
                    ":hover": {
                      "background-color": "#a4514e",
                    },
                    "background-color": "#b65a57",
                    ":focus": {
                      "background-color": "#a4514e",
                    },
                    "padding-left": "50px",
                    "padding-right": "50px",
                  },
                  quantityInput: {
                    "font-size": "17px",
                    "padding-top": "16.5px",
                    "padding-bottom": "16.5px",
                  },
                },
                text: {
                  button: "Add to cart",
                },
              },
              option: {
                styles: {
                  label: {
                    color: "#464646",
                  },
                },
                googleFonts: ["Droid Sans"],
              },
              cart: {
                styles: {
                  button: {
                    "font-size": "17px",
                    "padding-top": "16.5px",
                    "padding-bottom": "16.5px",
                    ":hover": {
                      "background-color": "#a4514e",
                    },
                    "background-color": "#b65a57",
                    ":focus": {
                      "background-color": "#a4514e",
                    },
                  },
                },
                text: {
                  title: "カートリスト",
                  total: "小計",
                  empty: "カートに何も入っていません",
                  notice: "送料無料 - 期間限定割引 適用済み",
                  button: "購入手続きへ進む",
                },
                popup: false,
              },
              toggle: {
                styles: {
                  toggle: {
                    "background-color": "#b65a57",
                    ":hover": {
                      "background-color": "#a4514e",
                    },
                    ":focus": {
                      "background-color": "#a4514e",
                    },
                  },
                  count: {
                    "font-size": "17px",
                  },
                },
              },
            },
          });
        }}
      />
    </>
  );
};
