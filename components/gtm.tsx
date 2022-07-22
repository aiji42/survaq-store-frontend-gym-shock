import { FC } from "react";

const script = (gtmId: string) => `console.log("${gtmId}")`;

export const GTM: FC<{ gtmId: string }> = ({ gtmId }) => {
  return <script dangerouslySetInnerHTML={{ __html: script(gtmId) }} />;
};
