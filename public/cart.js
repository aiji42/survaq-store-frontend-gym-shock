(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'survaq.myshopify.com',
      storefrontAccessToken: 'c17165e39598436fb3ae3a00b86f634c',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '7001442484429',
        node: document.getElementById('product-component-1658452708280'),
        moneyFormat: '%C2%A5%7B%7Bamount_no_decimals%7D%7D',
        options: {
          "product": {
            "iframe": false,
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px"
                }
              },
              "button": {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#a4514e"
                },
                "background-color": "#b65a57",
                ":focus": {
                  "background-color": "#a4514e"
                },
                "padding-left": "50px",
                "padding-right": "50px"
              },
              "quantityInput": {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px"
              }
            },
            "contents": {
              "img": false,
              "title": false,
              "price": false
            },
            "text": {
              "button": "カートに追加"
            }
          },
          "productSet": {
            "styles": {
              "products": {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px"
                }
              }
            }
          },
          "modalProduct": {
            "contents": {
              "img": false,
              "imgWithCarousel": true,
              "button": false,
              "buttonWithQuantity": true
            },
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px"
                }
              },
              "button": {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#a4514e"
                },
                "background-color": "#b65a57",
                ":focus": {
                  "background-color": "#a4514e"
                },
                "padding-left": "50px",
                "padding-right": "50px"
              },
              "quantityInput": {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px"
              }
            },
            "text": {
              "button": "Add to cart"
            }
          },
          "option": {
            "styles": {
              "label": {
                "color": "#464646"
              }
            },
            "googleFonts": [
              "Droid Sans"
            ]
          },
          "cart": {
            "styles": {
              "button": {
                "font-size": "17px",
                "padding-top": "16.5px",
                "padding-bottom": "16.5px",
                ":hover": {
                  "background-color": "#a4514e"
                },
                "background-color": "#b65a57",
                ":focus": {
                  "background-color": "#a4514e"
                }
              }
            },
            "text": {
              "title": "カートリスト",
              "total": "小計",
              "empty": "カートに何も入っていません",
              "notice": "送料無料 - 期間限定割引 適用済み",
              "button": "購入手続きへ進む"
            },
            "popup": false
          },
          "toggle": {
            "styles": {
              "toggle": {
                "background-color": "#b65a57",
                ":hover": {
                  "background-color": "#a4514e"
                },
                ":focus": {
                  "background-color": "#a4514e"
                }
              },
              "count": {
                "font-size": "17px"
              }
            }
          }
        },
      });
    });
  }
})();
