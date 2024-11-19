import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const columns = [
  {
    width: 50,
    label: "Titulo Bitacora",
    dataKey: "TITULO", //Nombre del campo en Firesteor
  },
  {
    width: 200,
    label: "Descripcion",
    dataKey: "DESCRIPCION",
  },
  {
    width: 100,
    label: "Fecha",
    dataKey: "FECHA_CREACION",
  },
];

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
          sx={{
            backgroundColor: "black",
            color: "white",
            fontFamily: "var(--font3)",
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
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
          sx={{
            backgroundColor: index % 2 === 0 ? "white" : "cornflowerblue",
            fontFamily: "var(--font3)",
            lineHeight: "2.5",
            textAlign:
              column.dataKey === "FECHA_CREACION" ? "center" : "justify",
            fontWeight: "bold",
          }}
        >
          {row[column.dataKey] || "N/A"}
          {/* Muestra "N/A" si el campo está vacío */}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ListaBitacoras() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BITACORA"));
        const documentos = querySnapshot.docs.map((doc) => ({
          id: doc.id, // ID del documento
          ...doc.data(), // Datos del documento
        }));
        setData(documentos);
      } catch (error) {
        alert("Error al traer los documentos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper style={{ height: "100vh", width: "100%" }}>
      <TableVirtuoso
        sx={{ borderRadius: "0px", borderTop: "solid 1px white" }}
        data={data} // Cambiado a data
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
