import React, { useState, useEffect } from "react";
import styles from "./TicketPageCompany.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

const TicketPage = () => {
  const { idCompany } = useParams();
  const TVA = 5.5;
  const [ticketInfo, setTicketInfo] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [companyInfo, setCompanyInfo] = useState({})
  const [priceExclTax, setPriceExclTax] = useState(0)

  const fetchData = async () => {
    await axios
      .get(`/ticket/last/${idCompany}`)
      .then((res) => setTicketInfo(res.data.message))
      .catch(() => console.log("error"))
  }

  useEffect(() => {
    fetchData();
  }, [])

  const getTotalPrice = () => {
    let price = 0
    ticketInfo?.listProducts?.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price);
  }

  const getCompanyInfo = async () => {
    await axios
      .get(`/company/${ticketInfo?.companyId}`).then((res) => setCompanyInfo(res.data.message))
  }

  

  useEffect(() => {
    getTotalPrice();
    if(ticketInfo?.companyId){
      getCompanyInfo();
    }
  }, [ticketInfo])

  const calcExclTax = () => {
    setPriceExclTax(totalPrice / (1 + (TVA / 100)))
  }

  useEffect(() => {
    calcExclTax();
  }, [totalPrice])


  return (
    <>
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mon ticket</h3>
          <div className={styles.item}>
            <div className={styles.company_name}>{companyInfo.name}</div>
            <div className={styles.company_place}>{/*TODO place*/}</div>
            <div className={styles.company_date}>
              Le {Moment(ticketInfo?.creationDate).format("DD/MM/YYYY").toLocaleString('fr-FR')} à {Moment(ticketInfo?.creationDate).format("hh").toLocaleString('fr-FR')}h{Moment(ticketInfo?.creationDate).format("mm").toLocaleString('fr-FR')}
            </div>
            <div className={styles.menu}>


              <div className={styles.list_item}>
                <div className={styles.left}>
                  <div className={styles.left_item_article_title}>ARTICLE</div>
                  {ticketInfo?.listProducts.map((item,index) => (
                    console.log(item),
                    <div key={index} className={styles.left_item_article_title}>{item.name}</div>
                  ))}
                </div>
                {/* <div className={styles.middle}>
                  <div className={styles.middle_item_article_title}>P.U. x QTE</div>
                  {articles.map((item,index) => (
                    <div key={index} className={styles.middle_item_article_title}>{item.price} x {item.quantity}</div>
                  ))}
                </div> */}
                <div className={styles.right}>
                  <div className={styles.right_item_article_title}>MONTANT</div>
                  {ticketInfo?.listProducts.map((item,index) => (
                    <div key={index} className={styles.right_item_article_title}>{item.price} €</div>
                  ))}
                </div>
              </div>


              <div className={styles.articles}>
              <div className={styles.left}>{ticketInfo?.listProducts?.length} articles</div>
                <div className={styles.right}>Total: {totalPrice}€</div>
              </div>


              <div className={styles.pay}>
                <div className={styles.left}>CB</div>
                <div className={styles.right}>{totalPrice}€</div>
              </div>


              <div className={styles.taxes}>

                <div className={styles.one}>
                  <div className={styles.top}>Taux</div>
                  <div className={styles.bottom}>{TVA.toFixed(2)} %</div>
                </div>
                
                <div className={styles.two}>
                  <div className={styles.top}>H.T.</div>
                  <div className={styles.bottom}>{priceExclTax.toFixed(2)} €</div>
                </div>

                <div className={styles.three}>
                  <div className={styles.top}>T.V.A.</div>
                  <div className={styles.bottom}>{(totalPrice - priceExclTax).toFixed(2)}</div>
                </div>

                <div className={styles.four}>
                  <div className={styles.top}>T.T.C.</div>
                  <div className={styles.bottom}>{totalPrice.toFixed(2)}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketPage;
