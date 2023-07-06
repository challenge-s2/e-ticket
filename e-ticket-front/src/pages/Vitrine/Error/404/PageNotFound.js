import { React } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


const PageNotFound = () => {
  return (
    <>
        <div style={{textAlign: 'center', padding:'2em', minHeight:'100vh'}} >
            <h1>Erreur 404</h1>
            <div style={{paddingBottom:'1.5em'}}>
                <h1>Page non trouvée</h1>
                <img width="96" src="https://img.icons8.com/color/240/close-window.png" alt="error"/>
            </div>
            <Link to="/">
                <Button variant={"contained"} color={"primary"}>Retour à l'accueil</Button>
            </Link>
        </div>
    </>
  );
};

export default PageNotFound;
