
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// import EntityList from '../pages/EntityList';
// import { Route, Routes } from 'react-router-dom';


const EntityListItem = ({ element, entityName }) => {

  const renderSwitch = (param) => {
    switch (param) {
      case 'airline_companies':
        return <Button
          variant="contained"
          component={Link}
          to='/flights'
        >
          Flights
        </Button>
          ;
      default:
        return 'meerong Gotcha';
    }
  }

  return (
    <Grid item sm={6} md={4}>
      <Card>
        <CardContent>
          {Object.keys(element).slice(1, -1).map((keyName, i) => (
            <Typography key={i} variant="h5" component="div">
              {element[keyName]}
            </Typography>
          ))}
          {renderSwitch(entityName)}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EntityListItem;