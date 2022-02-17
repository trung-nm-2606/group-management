import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';

const NewFundItem = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [pricePerMember, setPricePerMember] = useState(0);
  const [initTransaction, setInitTransaction] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const clearForm = useCallback(() => {
    setName('');
    setDesc('');
    setContent('');
    setPricePerMember(0);
    setInitTransaction(true);
    setAdding(false);
    setError(null);
  }, []);

  const onCreateNewFundItem = useCallback((e) => {
    e.preventDefault();
    setAdding(true);
    setError(null);
    axios
      .post('/api/fund/4/create_item', {
        name: name?.trim(),
        desc: desc?.trim(),
        content: content?.trim(),
        pricePerMember: +pricePerMember,
        initTransaction
      })
      .then((res) => {
        const { oper = {} } = res.data;
        const { status, error } = oper;
        if (status) {
          clearForm();
        } else {
          setError(error);
        }
        setAdding(false);
      })
      .catch(({ message }) => {
        setAdding(false);
        setError(message);
      })
    ;
  }, [clearForm, content, desc, initTransaction, name, pricePerMember]);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            Create new fund item
          </Typography>
        </Grid>
        {error && (
          <Grid item>
            <Alert severity="error" sx={{ marginBottom: 1 }}>{error}</Alert>
          </Grid>
        )}
        <Grid item>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={onCreateNewFundItem}
          >
            <TextField
              required
              id="fund-name"
              label="Name"
              variant="standard"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={adding}
            />
            <TextField
              required
              id="fund-desc"
              label="Description"
              variant="standard"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              disabled={adding}
            />
            <TextField
              required
              id="fund-content"
              label="Detail purpose"
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: '16px' }}
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={adding}
            />
            <TextField
              required
              id="fund-price-per-member"
              label="Price per member"
              variant="standard"
              fullWidth
              type="number"
              style={{ marginBottom: '16px' }}
              value={pricePerMember}
              onChange={e => setPricePerMember(e.target.value)}
              disabled={adding}
            />
            <FormControlLabel
              sx={{ color: 'text.secondary', marginBottom: 2, width: '100%' }}
              control={<Switch checked={initTransaction} />}
              label="Auto-add all group members to this fund"
              onChange={() => setInitTransaction(!initTransaction)}
              disabled={adding}
            />
            <Button type="submit" variant="contained" disabled={adding} sx={{ marginRight: 1 }}>Create</Button>
            <Button type="button" disabled={adding} color="inherit" onClick={clearForm}>Reset</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewFundItem;
