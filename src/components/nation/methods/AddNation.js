import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AddNation() {
    let navigate = useNavigate();
    const { id } = useParams();
    const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [religion, setReligion] = useState('');

    // eslint-disable-next-line
    const onSubmit = async (e) => {
        e.preventDefault();
        const nation = { name, language, religion };
        console.log(nation);
        console.log(id);
        try {
            const response = await fetch(`${apiUrl}/api/countries/${id}/nation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nation)
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
                <h1 style={{ color: "blue" }}>Add Nation</h1>
                <Box
                    component="form"
                    onSubmit={onSubmit}//?
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Nation name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Nation language" variant="outlined" fullWidth
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Nation relegion" variant="outlined" fullWidth
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
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
