import React, { useState } from "react";
import styles from "./ListingCompany.module.scss";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
import Moment from "moment";

const rows = [
  {
    id: 1,
    name: "John",
    description:
      "Lorem ipsum, consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "eCigarette",
    date: "2023-06-02T00:10:00",
  },
  {
    id: 2,
    name: "John",
    description:
      "Lorem ipsum, dolor sit amet consectetur exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Boulangerie/Patisserie",
    date: "2023-06-12T00:00:10",
  },
  {
    id: 3,
    name: "John",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipist. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Boulangerie/Patisserie",
    date: "2023-08-23T00:00:00",
  },
  {
    id: 4,
    name: "John",
    description:
      "Lorem ipssit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Salon de Beauté",
    date: "2020-05-03T00:00:00",
  },
  {
    id: 5,
    name: "John",
    description:
      "Lorm, dolor sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Boulangerie/Patisserie",
    date: "2020-05-02T00:00:00",
  },
  {
    id: 6,
    name: "John",
    description:
      "Lorem ipsum, dr sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "eCigarette",
    date: "2021-05-02T00:00:00",
  },
  {
    id: 7,
    name: "John",
    description:
      "Lorem ipsum, dolortetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Salon de Beauté",
    date: "2020-05-02T00:00:00",
  },
  {
    id: 8,
    name: "John",
    description:
      "Lorem, dolor sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "FastFood",
    date: "2023-07-07T00:00:00",
  },
  {
    id: 9,
    name: "John",
    description:
      "Loremipsum, dolor sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "FastFood",
    date: "2023-01-12T00:00:00",
  },
  {
    id: 10,
    name: "John",
    description:
      "Ipsum, dolor sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "FastFood",
    date: "2023-01-02T00:00:00",
  },
  {
    id: 11,
    name: "John",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid nostrum exercitationem corrupti perspiciatis non minima id similique ipsum unde ipsa at praesentium optio recusandae quis dolorum inventore, aspernatur labore expedita?",
    entrepriseType: "Salon de Beauté",
    date: "2022-05-02T10:00:00",
  },
];


const deleteCompany = (product) => {
  console.log(product); /* TDOD connexion avec la BDD */
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Nom de l'entreprise",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "entrepriseType",
    numeric: true,
    disablePadding: false,
    label: "Type d'entreprise",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date d'ajout",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Entreprises utilisants eTickets
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = () => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_commlist}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  sx={{ backgroundColor: "#bc6e2f" }}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">
                          {row.description.substring(0, 100)}...
                        </TableCell>
                        <TableCell align="right">
                          {row.entrepriseType}
                        </TableCell>
                        <TableCell align="right">
                          {Moment(row.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          <ButtonGroup>
                            <Link to={`/admin/company/${row.id}`}>
                              <Button variant="contained">
                                <DriveFileRenameOutlineIcon />
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteCompany(row.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default EnhancedTable;