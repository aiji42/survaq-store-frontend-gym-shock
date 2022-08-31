import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const MountOnOuterRoot = ({
  children,
  target,
}: {
  children: ReactNode;
  target: HTMLDivElement | undefined;
}) => {
  if (!target) return <></>;
  return createPortal(children, target);
};
