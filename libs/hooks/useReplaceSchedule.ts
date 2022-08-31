import { Product } from "@/libs/getProduct";
import { useEffect } from "react";

const replaceSchedule = (
  rule: Product["rule"],
  target: HTMLDivElement | HTMLParagraphElement | HTMLSpanElement
) => {
  const index = Number(target.dataset.index ?? 0);
  const short = !!target.dataset.short;
  target.innerText = rule.schedule.texts[index]?.slice(short ? 5 : NaN) ?? "";
};

export const useReplaceSchedule = (product: Product) => {
  useEffect(() => {
    document
      .querySelectorAll<HTMLSpanElement>(".delivery-schedule")
      .forEach((t) => {
        replaceSchedule(product.rule, t);
      });
  }, [product.rule]);
};
