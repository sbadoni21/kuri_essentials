'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';

const EmailDialog = ({ open, onClose, emailData }) => {
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [recevierName, setReceiverName] = useState ('');

  const handleSend = () => {
    if ( !topic || !message) {
      alert('Please fill in all fields.');
      return;
    }
    console.log(receiverEmail)
    const serviceId = 'service_p6lziqn';
    const templateId = 'template_5qrmv7m';
    const publicKey = '1Yj2KQoWA-s8hz3mP';
    const templateParams = {
      receiverEmail: receiverEmail,
      nameOfClient: recevierName,
      topic: topic,
      message: message,
    };
    console.log(templateParams)
    emailjs
    .send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );
  };

  useEffect(() => {
    if (open && emailData) {
      setReceiverEmail(emailData.email);
      setReceiverName(emailData.name);
    }
  }, [open, emailData]);
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
    
        <TextField
          label="Receiver's Email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mail Content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;
