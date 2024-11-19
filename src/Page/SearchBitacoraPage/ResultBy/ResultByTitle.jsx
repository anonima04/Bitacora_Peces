/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";

const ResultByTitle = ({ busqueda }) => {
  return (
    <>
      <div className="results-container">
        {busqueda.length > 0 ? (
          busqueda.map((bitacora) => (
            <Card key={bitacora.id} className="result-item">
              <CardContent>
                <Typography variant="h5">{bitacora.TITULO}</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Descripción:</strong> {bitacora.DESCRIPCION}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Fecha de Creación:</strong> {bitacora.FECHA_CREACION}
                </Typography>

                {/* Sección de Muestreos */}
                <Typography variant="h6" paragraph>
                  Muestreos
                </Typography>
                {bitacora.MUESTREOS?.length > 0 ? (
                  bitacora.MUESTREOS.map((muestreo, index) => (
                    <Paper key={index} elevation={3} className="muestreo-card">
                      <Typography variant="h6">Muestreo {index + 1}</Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Descripción del Hábitat:</strong>{" "}
                        {muestreo.DESCRIPCION_HABITAD}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Observación:</strong> {muestreo.OBSERVACION}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Condición Climática:</strong>{" "}
                        {muestreo.CONDICION_CLIMATICA}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Ubicación:</strong> {muestreo.UBICACION}
                      </Typography>

                      {/* Sección de Especies */}
                      <Typography variant="h6" paragraph>
                        Especies Recolectadas
                      </Typography>
                      {muestreo.especies?.length > 0 ? (
                        <Grid container spacing={2}>
                          {muestreo.especies.map((especie, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                              <Paper className="especie-card" elevation={2}>
                                <Typography variant="body2">
                                  <strong>Nombre Común:</strong>{" "}
                                  {especie.NOMBRE_COMUN}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Nombre Científico:</strong>{" "}
                                  {especie.NOMBRE_CIENTIFICO}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Estado:</strong> {especie.ESTADO}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Familia:</strong> {especie.FAMILIA}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Cantidad de Muestra:</strong>{" "}
                                  {especie.CANT_MUESTRA}
                                </Typography>

                                {/* Fotografías de la especie */}
                                {especie.FOTOGRAFIAS?.length > 0 ? (
                                  especie.FOTOGRAFIAS.map((foto, idx) => (
                                    <img
                                      key={idx}
                                      src={foto}
                                      alt={`Especie ${especie.NOMBRE_COMUN}`}
                                      className="especie-img"
                                    />
                                  ))
                                ) : (
                                  <Typography variant="body2">
                                    No hay fotos disponibles.
                                  </Typography>
                                )}
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography variant="body2">
                          No hay especies disponibles.
                        </Typography>
                      )}
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body2">
                    No hay muestreos disponibles.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default ResultByTitle;
