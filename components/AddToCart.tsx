import { Product } from "@/libs/getProduct";
import Script from "next/script";
import { ReactNode, useReducer, useRef } from "react";
import { createPortal } from "react-dom";

type CustomAttributes = { key: string; value: string }[];

declare global {
  interface Window {
    ShopifyCustomAttribute?: CustomAttributes;
    ShopifyBuy: {
      buildClient: (arg: {
        domain: string;
        storefrontAccessToken: string;
      }) => unknown;
      UI: {
        init: (arg: unknown) => {
          createComponent: (name: string, options: unknown) => void;
        };
      };
    };
  }
}

type Props = {
  product: Product;
  productId: number;
};

type ProductObject = {
  selectedVariantTrackingInfo: { id: string };
  setCustomAttributes: (arg: CustomAttributes) => void;
};

type Variant = Product["variants"][number];

const times = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, index) => index);

export const AddToCart = ({
  product: { variants, rule, skuLabel },
  productId,
}: Props) => {
  const target = useRef<HTMLDivElement>();
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

  if (typeof window !== "undefined")
    window.ShopifyCustomAttribute = [
      ...selects.map(({ label, selected }) => ({
        key: label,
        value: selected.name,
      })),
      {
        key: "配送予定",
        value: `${rule.schedule.text}(${rule.schedule.subText})`,
      },
    ];

  return (
    <>
      <MountOnBuyButton target={target.current}>
        {selects.map(({ label, selected, variant }, index) => (
          <div key={index}>
            <label>{label}</label>
            <select
              onChange={(e) =>
                handleSku({ type: "select", value: e.target.value, index })
              }
              defaultValue={selected.code}
            >
              {variant.skus.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </MountOnBuyButton>
      <Script
        src="/buybutton.js"
        strategy="afterInteractive"
        onLoad={() => {
          const client = window.ShopifyBuy.buildClient({
            domain: "survaq.myshopify.com",
            storefrontAccessToken:
              process.env.NEXT_PUBLIC_STORE_FRONT_ACCESS_TOKEN ?? "",
          });
          window.ShopifyBuy.UI.init(client).createComponent("product", {
            id: productId,
            node: document.getElementById("product-component-1658452708280"),
            moneyFormat: "%C2%A5%7B%7Bamount_no_decimals%7D%7D",
            options: {
              product: {
                iframe: false,
                templates: {
                  button: `
                     <div id="custom-selects-wrapper"></div>
                     <div class="shopify-buy__btn-wrapper" data-element="product.buttonWrapper">
                        <button class="shopify-buy__btn" data-element="product.button">カートに追加</button>
                     </div>`,
                },
                contents: {
                  img: false,
                  title: false,
                  price: false,
                },
                events: {
                  afterRender: function (product: ProductObject) {
                    handleSku({
                      type: "reset",
                      variant: variants.find(
                        ({ variantId }) =>
                          variantId ===
                          product.selectedVariantTrackingInfo.id.replace(
                            "gid://shopify/ProductVariant/",
                            ""
                          )
                      ),
                    });
                    target.current = document
                      .getElementById("custom-selects-wrapper")!
                      .appendChild(document.createElement("div"));
                  },
                  addVariantToCart: (product: ProductObject) => {
                    if (window.ShopifyCustomAttribute)
                      product.setCustomAttributes(
                        window.ShopifyCustomAttribute
                      );
                  },
                },
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

const MountOnBuyButton = ({
  children,
  target,
}: {
  children: ReactNode;
  target: HTMLDivElement | undefined;
}) => {
  if (!target) return <></>;
  return createPortal(children, target);
};
