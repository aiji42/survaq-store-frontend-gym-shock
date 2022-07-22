(function () {
  var c =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      b();
    } else {
      a();
    }
  } else {
    a();
  }
  function a() {
    var d = document.createElement("script");
    d.async = true;
    d.src = c;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(d);
    d.onload = b;
  }
  function b() {
    var d = ShopifyBuy.buildClient({
      domain: "survaq.myshopify.com",
      storefrontAccessToken: "c17165e39598436fb3ae3a00b86f634c",
    });
    ShopifyBuy.UI.onReady(d).then(function (e) {
      e.createComponent("product", {
        id: "7001442484429",
        node: document.getElementById("product-component-1658452708280"),
        moneyFormat: "%C2%A5%7B%7Bamount_no_decimals%7D%7D",
        options: {
          product: {
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
                ":hover": { "background-color": "#a4514e" },
                "background-color": "#b65a57",
                ":focus": { "background-color": "#a4514e" },
              },
              quantityInput: {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
              },
            },
            buttonDestination: "checkout",
            contents: { img: false, title: false, price: false },
            text: { button: "購入手続きに進む" },
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": { "margin-left": "-20px" },
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
                ":hover": { "background-color": "#a4514e" },
                "background-color": "#b65a57",
                ":focus": { "background-color": "#a4514e" },
              },
              quantityInput: {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
              },
            },
            text: { button: "Add to cart" },
          },
          option: { styles: { label: { color: "#464646" } } },
          cart: {
            styles: {
              button: {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": { "background-color": "#a4514e" },
                "background-color": "#b65a57",
                ":focus": { "background-color": "#a4514e" },
              },
            },
            text: { total: "Subtotal", button: "Checkout" },
            popup: false,
          },
          toggle: {
            styles: {
              toggle: {
                "background-color": "#b65a57",
                ":hover": { "background-color": "#a4514e" },
                ":focus": { "background-color": "#a4514e" },
              },
              count: { "font-size": "17px" },
            },
          },
        },
      });
    });
  }
})();
