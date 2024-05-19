import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddCity() {
    let navigate = useNavigate();
    const { id } = useParams();
    const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [population, setPopulation] = useState('');
    const [areaSquareKm, setAreaSquareKm] = useState('');

    // eslint-disable-next-line
    const onSubmit = async (e) => {
        e.preventDefault();
        const city = { name, population, areaSquareKm };
        console.log(city);
        console.log(id);
        try {
            const response = await fetch(`http://localhost:8080/api/countries/${id}/city`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(city)
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            navigate(`/get-country/${id}`);
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add City</h1>
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="City name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="City population" variant="outlined" fullWidth
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="City areaSquareKm" variant="outlined" fullWidth
                        value={areaSquareKm}
                        onChange={(e) => setAreaSquareKm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                        Submit
                    </button>
                    <Link
                        className="btn btn-outline-danger mx-2" 
                        to={`/get-country/${id}`}
                        >
                        Cancel
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}
