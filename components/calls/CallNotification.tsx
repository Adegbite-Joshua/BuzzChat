import React from 'react';
import { Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { motion } from 'framer-motion';

export default function CallNotification({ callType = 'Voice', setShowVideoCall, setShowCallNotification }: {callType?: string, setShowVideoCall: (value: boolean) => void, setShowCallNotification: (value: boolean) =>void}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
    >
      <Card sx={{ width: 290, borderRadius: '12px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Incoming {callType} Call
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Caller: John Doe
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
          <Button
            className='animate-bounce duration-150'
            variant="contained"
            sx={{ bgcolor: 'green', color: 'white', '&:hover': { bgcolor: 'darkgreen' } }}
            onClick={() => setShowVideoCall(true)}
          >
            Answer
          </Button>
          <Button
            // className='delay-200 animate-bounce duration-150'
            variant="contained"
            sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}
            onClick={() => setShowCallNotification(false)}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
