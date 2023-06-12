import React, { useState } from "react";
import styles from "./MyInformations.module.scss";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const contentCompanyType = [
  {
    key: 1,
    name: "Fastfood",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 2,
    name: "Institue de beauté",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 3,
    name: "Vente d'eCigarette",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 4,
    name: "Boulangerie/Patisserie",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 5,
    name: "Autre",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const MyInformations = () => {
  const [companyName, setCompanyName] = useState("Dior");
  const [companyDescription, setCompanyDescription] = useState(
    "Christian Dior Couture est une entreprise française de mode appartenant à LVMH. Héritage du couturier Christian Dior, bénéficiant du label « haute couture » elle trouve ses origines en 1946"
  );
  const [companyType, setCompanyType] = useState("Boulangerie/Patisserie");
  const [companyStartDate, setCompanyStartDate] = useState(dayjs("2023-01-15"));

  const handleSumbit = () => {
    console.log(companyName);
    console.log(companyDescription);
    console.log(companyType);
    console.log(companyStartDate);

    /*axios.post(url + 'company' + company.id, 
        {
            Header: "Bearer" + user.token
        },
        {
            name: company_name,
            description: company_description,
            type: company_type,
        }
        )*/
  };

  return (
    <div className={styles.container}>
      <div className={styles.company_name}>
        <TextField
          label="Nom de l'entreprise"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          variant="outlined"
          sx={{ width: "75%" }}
        />
      </div>

      <div className={styles.company_description}>
        <TextField
          label="Description de l'entreprise"
          value={companyDescription}
          multiline
          minRows={2}
          maxRows={4}
          onChange={(e) => setCompanyDescription(e.target.value)}
          variant="outlined"
          sx={{ width: "75%" }}
        />
      </div>

      <div className={styles.company_type}>
        <FormControl sx={{ width: "75%" }} size="medium">
          <InputLabel id="label">Type d'entreprise</InputLabel>
          <Select
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            labelId="label"
            id="select"
            label="Type d'entreprise"
            sx={{ textAlign: "left" }}
          >
            {contentCompanyType.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.company_start_date}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date de l'activation"
            value={companyStartDate}
            format="LL"
            disabled
            onChange={(e) => setCompanyStartDate(e.target.value)}
            variant="outlined"
            sx={{ width: "75%" }}
          />
        </LocalizationProvider>
      </div>

      <div className={styles.button_submit}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleSumbit}
          sx={{ width: "75%" }}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default MyInformations;
