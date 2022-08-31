import { Product } from "@/libs/getProduct";
import Script from "next/script";
import { MutableRefObject, Ref, useRef } from "react";
import { useSkuSelectors } from "@/libs/hooks/useSkuSelectors";
import { MountOnOuterRoot } from "@/components/MountOnOuterRoot";

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

export const AddToCart = ({
  product: { variants, rule, skuLabel },
  productId,
}: Props) => {
  const target = useRef<HTMLDivElement>();
  const { selects, handleSku } = useSkuSelectors({ skuLabel });

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
      <MountOnOuterRoot target={target.current}>
        {selects.map(({ label, selected, variant }, index) => (
          <div key={index} className="shopify-buy__option-select">
            <label className="shopify-buy__option-select__label">{label}</label>
            <div className="shopify-buy__option-select-wrapper">
              <select
                className="shopify-buy__option-select__select"
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
              <svg className="shopify-buy__select-icon" viewBox="0 0 24 24">
                <path d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z" />
              </svg>
            </div>
          </div>
        ))}
      </MountOnOuterRoot>
      <Script
        src="/buybutton.js"
        strategy="afterInteractive"
        onLoad={makeOnLoad({ productId, variants, target, handleSku })}
      />
    </>
  );
};

const makeOnLoad =
  ({
    productId,
    variants,
    target,
    handleSku,
  }: {
    productId: number | string;
    variants: Product["variants"];
    target: MutableRefObject<HTMLDivElement | undefined>;
    handleSku: ReturnType<typeof useSkuSelectors>["handleSku"];
  }) =>
  () => {
    const client = window.ShopifyBuy.buildClient({
      domain: "survaq.myshopify.com",
      storefrontAccessToken:
        process.env.NEXT_PUBLIC_STORE_FRONT_ACCESS_TOKEN ?? "",
    });
    window.ShopifyBuy.UI.init(client).createComponent("product", {
      id: productId,
      node: document.getElementById("buy-button"),
      moneyFormat: "%C2%A5%7B%7Bamount_no_decimals%7D%7D",
      options: {
        product: {
          iframe: false,
          contents: {
            img: false,
            title: false,
            price: false,
          },
          text: {
            button: "カートに追加",
          },
          events: {
            afterRender: (product: ProductObject) => {
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
                .getElementsByClassName(
                  "shopify-buy__product__variant-selectors"
                )[0]!
                .appendChild(document.createElement("div"));
            },
            addVariantToCart: (product: ProductObject) => {
              if (window.ShopifyCustomAttribute)
                product.setCustomAttributes(window.ShopifyCustomAttribute);
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
  };
