import { ProductOnMicroCms } from "@/libs/microCms";
import Script from "next/script";

type Props = Required<Pick<ProductOnMicroCms, "variants" | "skuLabel">>;

export const Cart = ({ variants }: Props) => {
  return (
    <Script
      src="/buybutton.js"
      strategy="afterInteractive"
      onLoad={() => {
        var client = window.ShopifyBuy.buildClient({
          domain: "survaq.myshopify.com",
          storefrontAccessToken: "c17165e39598436fb3ae3a00b86f634c",
        });
        window.ShopifyBuy.UI.init(client).createComponent("product", {
          id: "7001442484429",
          node: document.getElementById("product-component-1658452708280"),
          customAttributes: [
            { key: "_someHiddenKey", value: "someHiddenValue" },
            { key: "someKey", value: "someValue" },
          ],
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
                afterRender: function (product) {
                  const id = product.selectedVariantTrackingInfo.id.replace(
                    "gid://shopify/ProductVariant/",
                    ""
                  );
                  const variant = variants.find(
                    ({ variantId }) => variantId === id
                  );
                  if (!variant) return;
                  product.setCustomAttributes([
                    {
                      key: "_skus",
                      value: JSON.stringify(
                        variant.skus.map(({ code }) => code)
                      ),
                    },
                  ]);
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
  );
};
