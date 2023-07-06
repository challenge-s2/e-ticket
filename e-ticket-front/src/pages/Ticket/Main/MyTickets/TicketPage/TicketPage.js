import React, { useState, useEffect } from "react";
import styles from "./TicketPage.module.scss";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const TicketPage = () => {
  const { id } = useParams();
  const TVA = 5.5;
  const [ticketInfo, setTicketInfo] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [priceExclTax, setPriceExclTax] = useState(0)
  const [arrOfProductsSorted, setArrOfProductsSorted] = useState([])
  const [redirection, setRedirection] = useState(false)
  

  const fetchData = async () => {
    if(localStorage.getItem('userId') !== ''){
      try {
        await axios.get(`/users/${localStorage.getItem('userId')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        }).then((res) => {
          if(!res.data.message.ticketsScanned.includes(id)){
            toast.error('Vous ne pouvez pas accéder à ce ticket', {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
            setRedirection(true);
          }
          else {
            axios
              .get(`/ticket/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('user')}`
                }
              })
              .then((res) => setTicketInfo(res.data.message))
              .catch(() => console.log("error"))
          }
        })
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      setRedirection(true)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const getTotalPrice = () => {
  let price = 0
    ticketInfo?.listProducts?.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price - ticketInfo.promo);
  }

  

  useEffect(() => {
    if(ticketInfo !== undefined){
      getTotalPrice();
      ticketInfo.listProducts.sort((p1, p2) => {
        let fa = p1._id.toLowerCase();
        let fb = p2._id.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      })
      let startVar = '';
      let count = 0;
      let lastName = ''
      let lastPrice = ''
      let arr = []
      for (let lp = 0; lp < ticketInfo.listProducts.length; lp++) {
        if(startVar === ''){
          startVar = ticketInfo.listProducts[lp]._id;
          count = 1;
          lastName = ticketInfo.listProducts[lp].name;
          lastPrice = ticketInfo.listProducts[lp].price;
        }
        else if (startVar === ticketInfo.listProducts[lp]._id) {
          count ++;
        }
        else if(startVar !== ticketInfo.listProducts[lp]._id){
          arr.push({
            _id: startVar,
            name: lastName,
            price: lastPrice,
            totalCount: count,
          })
          startVar = ticketInfo.listProducts[lp]._id
          count = 1;
          lastName = ticketInfo.listProducts[lp].name;
          lastPrice = ticketInfo.listProducts[lp].price;
        }
        if(lp === ticketInfo.listProducts.length-1){
          arr.push({
            _id: startVar,
            name: lastName,
            price: lastPrice,
            totalCount: count,
          })
        }
        
      }
      setArrOfProductsSorted(arr)

    }
  }, [ticketInfo])

  const calcExclTax = () => {
    setPriceExclTax(totalPrice / (1 + (TVA / 100)))
  }

  useEffect(() => {
    calcExclTax();
  }, [totalPrice])

  const printTicket = () => {
    window.print()
  }

  return (
    <>
      {redirection ? <Navigate to={'/ticket/'} replace /> : <></>}
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mon ticket</h3>
          <div className={styles.item}>
            <div className={styles.company_name}>{ticketInfo?.companyInformations}</div>
              <div className={styles.company_date}>
              Le {Moment(ticketInfo?.creationDate).format("DD/MM/YYYY").toLocaleString('fr-FR')} à {Moment(ticketInfo?.creationDate).format("HH").toLocaleString('fr-FR')}h{Moment(ticketInfo?.creationDate).format("mm").toLocaleString('fr-FR')}
            </div>
            <div className={styles.menu}>

                <div className={styles.list_item}>
                  <div className={styles.left}>
                    <div className={styles.left_item_article_title}>ARTICLE</div>
                    {arrOfProductsSorted.map((item,index) => (
                      <div key={index} className={styles.left_item_article_title}>{item.name}</div>
                    ))}
                    <div className={styles.left_item_article_title}>Promotion</div>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.middle_item_article_title}>PxQ</div>
                    {arrOfProductsSorted.map((item,index) => (
                      <div key={index} className={styles.middle_item_article_title}>{item.price}€ x {item.totalCount}</div>
                    ))}
                    <div className={styles.middle_item_article_title}>-</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.right_item_article_title}>MONTANT</div>
                    {arrOfProductsSorted.map((item,index) => (
                      <div key={index} className={styles.right_item_article_title}>{item.price} €</div>
                    ))}
                    <div className={styles.right_item_article_title} style={{color: 'red'}}>- {ticketInfo?.promo} €</div>
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
          <div className={styles.download_button} style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
            <Button variant="contained" color="primary" onClick={() => printTicket()}>Télécharger</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketPage;
