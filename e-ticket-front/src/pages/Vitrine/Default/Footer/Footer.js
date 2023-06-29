import { React } from "react";
import styles from "./Footer.module.scss";

const links1 = [
  {
    key: 1,
    title: "Twitter",
    link: "https://www.twitter.com",
  },
  {
    key: 2,
    title: "Facebook",
    link: "https://www.facebook.com",
  },
  {
    key: 3,
    title: "Instagram",
    link: "https://www.instagram.com",
  },
];

const links2 = [
  {
    key: 1,
    title: "Changer mes informations",
    link: "/user/personal-data",
  },
  {
    key: 2,
    title: "Mes achats",
    link: "/list-mypurchases",
  },
  {
    key: 3,
    title: "Notre politique de confidentialité",
    link: "/user/confidentiality",
  },
];

const Footer = (display) => {

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.f_top_container}>

          <div className={styles.c_left}>
            <div className={styles.item_footer}>
              <ul className={styles.fl_ul}>
                {links1.map((item) => (
                  <div key={item.key}>{item.title}</div>
                ))}
              </ul>
            </div>
            <div className={styles.item_footer}>
              <ul className={styles.fl_ul}>
                {links2.map((item) => (
                  <div key={item.key}>{item.title}</div>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.c_right}>
            <div className={styles.item_container_right}>Français</div>
          </div>

        </div>

        <div className={styles.f_bottom_container}>
          <div className={styles.fb_left}>eTickets</div>
          <div className={styles.fb_right}>© 2023 eTickets, Inc.</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
