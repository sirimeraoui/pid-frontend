import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Container,
  Alert,
  CircularProgress,
  Fab,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import EntityListItem from '../components/EntityListItem';
import useAxios from "axios-hooks";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';


const EntityList = ({ entityName }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:8080/api/v1/${entityName}`,
    params: {
      page: currentPage - 1,
      size: 5,
    }
  });
  return (
    <Container>
      <Stack spacing={2}>
        <Typography
          variant='h4'
          component="div"
          gutterBottom
        >
          {entityName[0].toUpperCase() + entityName.slice(1)}
        </Typography>
        {loading && <CircularProgress />}
        {error && (
          <Alert severity="error">
            Accès non autorisé
          </Alert>
        )}
        {data && (
          <>
            <Grid container spacing={2}>
              {data.content.map((element) => (
                <EntityListItem key={element.id} element={element} entityName={entityName} />
              ))}
            </Grid>

            <Fab
              color="primary"
              aria-label="add"
              component={Link}
              to={`/${entityName}/new`}
            >
              <AddCircleIcon />
            </Fab>
            {data && (
              <Stack sx={{ mb: 2 }} justifyContent="flex-end" alignItems="center">
                <Pagination sx={{ py: 2 }} count={data.totalPages} onChange={handlePageChange} variant="outlined" color="primary" />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default EntityList;