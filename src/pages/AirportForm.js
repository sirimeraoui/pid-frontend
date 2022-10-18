import React, { useState } from 'react'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
//import Typography from '@mui/material/Typography';
import { Alert, Button, Box, Stack, TextField, Typography } from "@mui/material";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";

function AirportForm({ entityName }) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        name: "",
        city: "",
        country: "",
        latitude: null,
        longitude: null,
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    };
    const { name, city, country, latitude, longitude } = formValue;
    //post and submit handling
    const [{ loading, error }, postData] = useAxios(
        {
            url: `http://localhost:8080/api/v1/${entityName}`,
            method: "POST",
        },
        { manual: true }
    );

    function handleSubmit(event) {
        event.preventDefault();
        postData({ data: { name, city, country, latitude, longitude } }).then(() => {
            navigate(-1);
        });
    }
    return (
        <Container size="sm">
            <Stack alignItems="center">
                <Typography
                    variant="dev"
                    color="textSecondary"
                    component="h3"
                    mt={2}
                    gutterBottom
                >
                    Add new airport
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleSubmit} >

                    {Object.keys(formValue).map((keyName, i) =>

                        <Box key={i} sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                            {/* <CreateOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
                            <TextField
                                id="input-with-sx"
                                label={keyName}
                                name={keyName}
                                variant="standard"
                                onChange={handleChange}
                                value={formValue[keyName]}
                                disabled={loading}
                            />
                        </Box>
                    )}

                    <Box sx={{ my: 2 }}>
                        <Button

                            type="submit"
                            color="primary"
                            variant="outlined"
                            endIcon={<KeyboardArrowRightIcon />}>
                            Submit
                        </Button></Box>
                    {error && <Alert severity="error">Une erreur s'est produite</Alert>}
                </form>
            </Stack>
        </Container>
    );
}
export default AirportForm;
