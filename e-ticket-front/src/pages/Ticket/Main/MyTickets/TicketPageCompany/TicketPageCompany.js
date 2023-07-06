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
  const [ticketOwnedByUser, setTicketOwnedByUser] = useState(false);
  const TVA = 5.5;
  const [totalPrice, setTotalPrice] = useState(0)
  const [priceExclTax, setPriceExclTax] = useState(0)
  const [arrOfProductsSorted, setArrOfProductsSorted] = useState([])
  const [ticketId, setTicketId] = useState('')
  const [ticketInfo, setTicketInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [fidelityInfo, setFidelityInfo] = useState({})
  
  const fetchTicket = async () => {
    try {
      await axios
        .get(`/ticket/last/${idCompany}`)
        .then((res) => {
          setTicketInfo(res.data.message)
          setTicketAlreadyScanned(res.data.message.scanned)
          setTicketId(res.data.message._id)
  
          if(localStorage.getItem('userId') === '') {
            setTicketAlreadyScanned(res.data.message.scanned);
            if (res.data.message.scanned){
              setTicketOwnedByUser(false);
            }
          }

        })
        
        .catch(() => console.log("err"))
    }
    catch (err) {
      console.log(err)
    }
  }

  const fetchUser = async () => {
    try {
      await axios.get(`/users/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then((res) => {
        setUserInfo(res.data.message)
        })
    }
    catch (err) {
      console.log(err)
    }
  }


  const fetchFidelity = async () => {
    try {
      await axios.get(`/fidelity/one/${idCompany}/${userInfo.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then((res) => {
        if(res.data.message === null){
          setFidelityInfo({
            userId: 'none'
          })
        }
        else {
          setFidelityInfo(res.data.message)
        }
      })
    }
    catch (err) {
      console.log(err)
      setFidelityInfo({
        userId: 'none'
      })
    }
  }

  const postFidelity = async () => {
    try {
      axios.post(`/fidelity/` ,{
        companyId: idCompany,
        userId: localStorage.getItem('userId'),
        points: totalPrice * 0.05,
        companyInformations: ticketInfo?.companyInformations,
        userMail: userInfo.email
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
    }
     catch (err) {
      console.log(err)
     }
  }

  const patchFidelity = async () => {
    try {
      axios.patch(`/fidelity/${fidelityInfo._id}`, {
        points: parseInt(fidelityInfo.points + (totalPrice * 0.05))
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
    }
     catch (err) {
      console.log(err)
     }
  }

  const patchUser = async () => {
    try {
      if(!userInfo.ticketsScanned.includes(ticketInfo._ic)){
        await axios.patch(`/users/${localStorage.getItem('userId')}`, {
          ticketsScanned: [...userInfo.ticketsScanned, ticketInfo._id]
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        })
        console.log('user patched')
      }
      else {
        console.log("ticket already in user list ticketScanned")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const patchTicket = async () => {
    await axios.patch(`/ticket/${ticketInfo._id}`, {
      scanned : true
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    console.log('ticket patched')
  }


  const checkTicketOwner = () => {
    if(ticketInfo.scanned){
      console.log("déjà scanné")
      if(userInfo.ticketsScanned.includes(ticketInfo._id)){
        console.log("a moi")
      }
      else {
        console.log("pas à moi")
        setTicketOwnedByUser(false)
        setTicketAlreadyScanned(true)
      }
    }
    else {
      console.log("pas scanné")
      patchUser()
      patchTicket();
      if(fidelityInfo.userId !== localStorage.getItem("userId")){
        console.log('pas de fidelité')
        postFidelity();
      }
      else {
        console.log('fidelité')
        patchFidelity();
      }

    }
  
  }

  const getTotalPrice = () => {
    let price = 0
    ticketInfo?.listProducts?.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price - ticketInfo.promo);
  }

  const calcExclTax = () => {
    setPriceExclTax(totalPrice / (1 + (TVA / 100)))
  }


  useEffect(() => {
      fetchTicket();
  }, [])

  useEffect(() => {
    if(Object.entries(ticketInfo).length > 0 && localStorage.getItem('userId') !== ''){
      fetchUser();
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
      getTotalPrice();
    }
  }, [ticketInfo])
  
  useEffect(() => {
    if(Object.entries(userInfo).length > 0 && localStorage.getItem('userId') !== ''){
      if(userInfo.ticketsScanned.includes(ticketInfo._id)){
        setTicketOwnedByUser(true)
      }
      else {
        setTicketOwnedByUser(false)
      }
      fetchFidelity();
    }
  }, [userInfo])

  useEffect(() => {
    if(Object.entries(fidelityInfo).length > 0 && localStorage.getItem('userId') !== '' && totalPrice > 0){
      checkTicketOwner();
      
    }
  }, [fidelityInfo])

  useEffect(() => {
    calcExclTax();
  }, [totalPrice])



  const printTicket = () => {
    window.print()
  }


  return (
    <>
      {ticketAlreadyScanned && !ticketOwnedByUser ?
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
      }
    </>
  );
};

export default TicketPageCompany;
