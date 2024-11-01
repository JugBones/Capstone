import React, { useEffect, useState } from 'react';
import { Avatar, Grid, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';
import { auth } from '../firebase';  // Import Firebase authentication

const Appreciation = () => {
    const [appreciations, setAppreciations] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchAppreciations = async () => {
            try {
                const user = auth.currentUser; // Get the current authenticated user
                if (user) {
                    const firebaseUid = user.uid;
                    const url = `http://localhost:8000/appreciations?firebase_uid=${firebaseUid}`;
                    console.log("Request URL:", url);
                    const response = await axios.get(url);
                    console.log("Response:", response);
                    setAppreciations(response.data);
                } else {
                    console.error("User is not authenticated");
                }
            } catch (error) {
                console.error('Error fetching appreciations:', error);
            }
        };

        // Set an auth state observer to check when the user logs in
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchAppreciations();
            } else {
                console.error("No authenticated user found");
            }
        });

        // Clean up the auth observer
        return () => unsubscribe();
    }, []);

    const handleClickOpen = (message) => {
        setSelectedMessage(message);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMessage(null);
    };

    return (
        <Grid container spacing={2}>
            {appreciations.map((item, index) => (
                <Grid item key={index} xs={6}>
                    <Avatar alt={item.teacher_name} src={`/tutors/tutor-${index}.jpg`} />
                    <Typography variant="body1">{item.teacher_name}</Typography>
                    <Typography variant="body2">{item.message.slice(0, 50)}...</Typography>
                    <Button variant="outlined" onClick={() => handleClickOpen(item.message)}>
                        View Details
                    </Button>
                </Grid>
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Message</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">{selectedMessage}</Typography>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};

export default Appreciation;
