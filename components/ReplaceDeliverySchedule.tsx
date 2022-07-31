import Script from "next/script";

declare global {
  interface Window {
    customScriptSurvaq: (id: number) => void;
  }
}

export const ReplaceDeliverySchedule = ({
  productId,
}: {
  productId: number;
}) => {
  return (
    <Script
      src="https://survaq-shopify-partial.vercel.app/bundle.umd.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.customScriptSurvaq(productId);
      }}
    />
  );
};
