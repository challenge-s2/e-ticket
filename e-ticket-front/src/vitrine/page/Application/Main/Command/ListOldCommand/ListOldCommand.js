import React from "react";
import styles from "./ListOldCommand.module.scss";
import LastPageIcon from "@mui/icons-material/LastPage";

const ListOldCommand = () => {
  const content = [
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 1,
      price: 52,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_commlist}>
          <h2>Liste des anciènnes commandes:</h2>
          <div className={styles.container_grid}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prix total</th>
                  <th>Date de la commande</th>
                  <th>Par qui ?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.map((c) => {
                  <>
                    <tr>
                      <td>{c.id}</td>

                      <td>{c.price}</td>

                      <td>{c.date}</td>

                      <td>{c.people}</td>

                      <td>
                        <button className="bttn bttn-wng">
                          {/* <Link to="/app/command-page/1"><va-icon name="last_page"/></Link> */}
                          <LastPageIcon />
                        </button>
                      </td>
                    </tr>
                  </>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOldCommand;
