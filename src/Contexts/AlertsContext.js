import React, { createContext, useState } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export const AlertsContext = createContext();

export function AlertsProvider(props) {
  const [alertItem, setAlertItem] = useState('');
  const [open, setOpen] = useState(false);

  const alertMsg = (type, title = '', description = '', errorObject = {}, ms = 6000) => {
    console.log({
      type,
      title,
      description,
      errorObject,
    });
    setAlertItem({
      ms,
      type,
      title,
      description,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlertItem('');
  };

  return (
    <AlertsContext.Provider value={{ alertMsg }}>
      {props.children}
      {
        alertItem && (alertItem.title || alertItem.description) ? <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={alertItem.ms}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity={alertItem.type}
            onClose={() => handleClose(false)}
          >
            {alertItem.title ? <AlertTitle>{alertItem.title}</AlertTitle> : ''}
            {alertItem.description ? <span>{alertItem.description}</span> : ''}
          </Alert>
        </Snackbar> : ''
      }
    </AlertsContext.Provider>
  )
}
