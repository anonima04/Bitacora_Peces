import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Chance from "chance";

const chance = new Chance(42);

function createData(id) {
  return {
    id,
    firstName: chance.first(),
    lastName: chance.last(),
    age: chance.age(),
    phone: chance.phone(),
    state: chance.state({ full: true }),
  };
}

const columns = [
  {
    width: 100,
    label: "First Name",
    dataKey: "firstName",
  },
  {
    width: 100,
    label: "Last Name",
    dataKey: "lastName",
  },
  {
    width: 50,
    label: "Age",
    dataKey: "age",
    numeric: true,
  },
  {
    width: 110,
    label: "State",
    dataKey: "state",
  },
  {
    width: 130,
    label: "Phone Number",
    dataKey: "phone",
  },
];

const rows = Array.from({ length: 200 }, (_, index) => createData(index));

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Asignar displayName para mejorar la depuración
VirtuosoTableComponents.Scroller.displayName = "Scroller";
VirtuosoTableComponents.Table.displayName = "Table";
VirtuosoTableComponents.TableHead.displayName = "TableHead";
VirtuosoTableComponents.TableRow.displayName = "TableRow";
VirtuosoTableComponents.TableBody.displayName = "TableBody";

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "lightgreen" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
          sx={{ backgroundColor: index % 2 === 0 ? "white" : "lightgoldenrodyellow" }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableBitacora() {
  return (
    <Paper style={{ height: "100vh", width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
