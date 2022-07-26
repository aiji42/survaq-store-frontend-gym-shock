import Link from "next/link";
import Image from "next/image";
import icons from "../public/payment-icons.jpg";

export const Footer = () => {
  return (
    <footer className="item_footer">
      <ul className="footer_link_list">
        <li className="site-footer__linklist-item">
          <Link href="/">ホーム</Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link
            href="https://survaq.com/"
            aria-describedby="a11y-external-message"
          >
            会社概要
          </Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link href="https://survaq-store.com/policies/privacy-policy">
            プライバシーポリシー
          </Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link href="https://survaq-store.com/policies/terms-of-service">
            利用規約
          </Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link href="https://survaq-store.com/policies/refund-policy">
            返金ポリシー
          </Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link href="https://survaq-store.com/policies/legal-notice">
            特定商取引法に基づく表記
          </Link>
        </li>
        <li className="site-footer__linklist-item">
          <Link href="https://survaq-store.com/pages/support">
            お問い合わせ
          </Link>
        </li>
      </ul>
      <div className="payment">
        <figure className="payment_ico">
          <Image src={icons} alt="支払方法" />
        </figure>
      </div>
      <div className="copyright">&copy; 2022 SurvaQ inc.</div>
    </footer>
  );
};
