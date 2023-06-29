import React from "react";
import styles from "./ProductNotFound.module.scss";
import ProductImage from "../../../../utils/assets/Product.png";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <>
      <div className={styles.returnButton}>
        <Link to="/app/list-products">
          <IconButton
            variant="contained"
            sx={{ textAlign: "left" }}
            onClick={() => console.log("test")}
          >
            <ArrowBackIcon sx={{ fontSize: 50, color: "#353535" }} />
          </IconButton>
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Product non trouvé</h1>
        <img loading="lazy" src={ProductImage} alt="Product not found" />
      </div>
    </>
  );
};

export default ProductNotFound;
