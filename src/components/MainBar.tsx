import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Coin from '../constants/Coin';
import Currency from '../constants/Currency';

function MainBar() {
  const [coin, setCoin] = React.useState(Coin.BTC);
  const [currency, setCurrency] = React.useState(Currency.USD);

  const handleCoinChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as Coin);
  };

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <FormControl sx={{ mr: 2 }} size="small">
            <Select
              value={coin}
              onChange={handleCoinChange}
              sx={{
                color: 'inherit',
                '.MuiSvgIcon-root': {color: 'inherit'}
              }}
            >
              <MenuItem value={Coin.BTC}>{Coin.BTC}</MenuItem>
              <MenuItem value={Coin.ETH}>{Coin.ETH}</MenuItem>
              <MenuItem value={Coin.LINK}>{Coin.LINK}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              sx={{
                color: 'inherit',
                '.MuiSvgIcon-root': {color: 'inherit'}
              }}
            >
              <MenuItem value={Currency.USD}>{Currency.USD}</MenuItem>
              <MenuItem value={Currency.EUR}>{Currency.EUR}</MenuItem>
              <MenuItem value={Currency.PLN}>{Currency.PLN}</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainBar;