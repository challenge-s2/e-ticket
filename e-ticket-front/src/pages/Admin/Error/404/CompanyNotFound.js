import React from "react";
import styles from "./CompanyNotFound.module.scss";
import Company from "../../../../utils/assets/Company.png"
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const CompanyNotFound = () => {
  return (
    <>
      <div className={styles.returnButton}>
        <Link to="/app/list-products">
          <IconButton variant="contained" sx={{textAlign: 'left'}} onClick={() => console.log('test')}>
          <ArrowBackIcon sx={{fontSize: 50, color: '#353535'}}/>
          </IconButton>
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Entreprise non trouvé</h1>
        <img src={Company} alt="company not found"/>
        
      </div>
    </>
  );
};

export default CompanyNotFound;
