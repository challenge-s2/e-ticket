import React, { useState, useEffect } from "react";
import styles from "./TicketPageCompany.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button } from "@mui/material";

const TicketPageCompany = () => {
  const { idCompany } = useParams();
  const [ticketAlreadyScanned, setTicketAlreadyScanned] = useState(false);
  const TVA = 5.5;
  const [ticketInfo, setTicketInfo] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [companyInfo, setCompanyInfo] = useState({})
  const [priceExclTax, setPriceExclTax] = useState(0)
  const [arrOfProductsSorted, setArrOfProductsSorted] = useState([])

  const fetchData = async () => {
    await axios
      .get(`/ticket/last/${idCompany}`
      ,{
        headers: {  
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE0MmM3OWQzNTFhNDc4OTMzZTlhNWEiLCJpYXQiOjE2ODg0ODg1NTV9.06ydg5V3HnX4ufiiMOq4QyWpr-ClAttjBo8Ml8CYtMQ"
        }
      }
      )
      .then((res) => {
        setTicketInfo(res.data.message)
        setTicketAlreadyScanned(res.data.message.scanned)
        if(!res.data.message.scanned) {
          let arr = [];
          if(localStorage.getItem('userId') === ''){ //not connected

            console.log(res.data.message._id)
            console.log(localStorage.getItem('ticketsScanned'))
            if(!localStorage.getItem('ticketsScanned').includes(res.data.message._id.toString())){
              if(localStorage.getItem('ticketsScanned') !== null && localStorage.getItem('ticketsScanned') !== '[]' && localStorage.getItem('ticketsScanned') !== '') {  
                arr = JSON.parse(localStorage.getItem("ticketsScanned"));
              }
              arr.push(res.data.message._id.toString());
              localStorage.setItem("ticketsScanned", JSON.stringify(arr)); 
              console.log('changed')
            }
            else {
              console.log('already in localstorage')
            }
            /*axios.patch(`/ticket/${res.data.message._id}`,{
              scanned: true
            },{
              headers: {  
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE0MmM3OWQzNTFhNDc4OTMzZTlhNWEiLCJpYXQiOjE2ODg0ODg1NTV9.06ydg5V3HnX4ufiiMOq4QyWpr-ClAttjBo8Ml8CYtMQ"
              }
            }).then(() => console.log("scanned"))*/
          }
          else { // connected
            console.log('connected')

            //patch user add id ticket
            //patch ticket scanned true
          }
        }
      })
      
      .catch(() => console.log("err"))
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if(ticketInfo !== undefined){
      console.log(ticketInfo)
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
        console.log(ticketInfo.listProducts[lp])
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
      console.log(arr)

    }
  }, [ticketInfo])

  const getTotalPrice = () => {
    let price = 0
    ticketInfo?.listProducts?.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price);
  }

  const getCompanyInfo = async () => {
    await axios
      .get(`/company/${ticketInfo?.companyId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE0MmM3OWQzNTFhNDc4OTMzZTlhNWEiLCJpYXQiOjE2ODg0ODg1NTV9.06ydg5V3HnX4ufiiMOq4QyWpr-ClAttjBo8Ml8CYtMQ"
        }      
      }).then((res) => setCompanyInfo(res.data.message))
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

  const printTicket = () => {
    window.print()
  }


  return (
    <>
      {ticketAlreadyScanned ?
        <div className={styles.container}>
          <div className={styles.item_home}>
            <h3>Mon ticket</h3>
            <div className={styles.item}>
              <div>
                <WarningRoundedIcon color="error" fontSize="large"/>
                <div className={styles.text}>
                  Le ticket que vous essayez de visualiser est bloqué, il a déjà été scanné
                </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div className={styles.container}>
          <div className={styles.item_home}>
            <h3>Mon ticket</h3>
            <div className={styles.item}>
              <div className={styles.company_name}>{companyInfo.name} - {companyInfo.address}</div>
              <div className={styles.company_place}>{/*TODO place*/}</div>
              <div className={styles.company_date}>
                Le {Moment(ticketInfo?.creationDate).format("DD/MM/YYYY").toLocaleString('fr-FR')} à {Moment(ticketInfo?.creationDate).format("hh").toLocaleString('fr-FR')}h{Moment(ticketInfo?.creationDate).format("mm").toLocaleString('fr-FR')}
              </div>
              <div className={styles.menu}>


                <div className={styles.list_item}>
                  <div className={styles.left}>
                    <div className={styles.left_item_article_title}>ARTICLE</div>
                    {arrOfProductsSorted.map((item,index) => (
                      <div key={index} className={styles.left_item_article_title}>{item.name}</div>
                    ))}
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.middle_item_article_title}>P.U. x QTE</div>
                    {arrOfProductsSorted.map((item,index) => (
                      <div key={index} className={styles.middle_item_article_title}>{item.price}€ x {item.totalCount}</div>
                    ))}
                  </div>
                  <div className={styles.right}>
                    <div className={styles.right_item_article_title}>MONTANT</div>
                    {arrOfProductsSorted.map((item,index) => (
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
            <div className={styles.download_button} style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
              <Button variant="contained" color="primary" onClick={() => printTicket()}>Télécharger</Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default TicketPageCompany;
