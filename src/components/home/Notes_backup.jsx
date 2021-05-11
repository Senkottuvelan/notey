import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import { makeStyles } from '@material-ui/core/styles';
//SMSKEYS
const SEND_SMS_API_KEY =
  "ZIoUQdVzuQdrovlrHOktWaJC38xDwwaZzMB0KUJIOyUwNdZ4Gtrza6pBWV3g";
//EMAILKEYS
const sendMail = require("@sendgrid/mail");
const SEND_EMAIL_API_KEY =
  "MY_KEY";
sendMail.setApiKey(SEND_EMAIL_API_KEY);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
var note, note_for_sms, mobile_for_sms;
export default function Notes(props) {
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState({
    mobile: "",
  });
  const [openemailsuccess, setOpenEmailsuccess] = React.useState(false);
  const handleCloseEmailSuccess = () => {
    setOpenEmailsuccess(false);
  };
  const [openemailfailure, setOpenEmailFailure] = React.useState(false);
  const handleCloseEmailFailure = () => {
    setOpenEmailFailure(false);
  };

  const handleClickOpen = (note) => {
    // var note_for_sms;
    localStorage.setItem("note_for_sms", note);
    console.log(localStorage.getItem("note_for_sms"));
    if (localStorage.getItem("mobile_for_sms")) {
      setOpen2(false);
      Sendsms(localStorage.getItem("mobile_for_sms"));
    } else {
      setOpen2(true);
    }
    //setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handlesendsms = (mobileno) => {
    // var mobile_for_sms;
    setOpen2(false);
    localStorage.setItem("mobile_for_sms", mobileno);
    //console.log(mobileno);
    Sendsms(mobileno);

    //Sendsms(open3.mobile);
  };
  function Sendsms(mobileno) {
    //let smsdata = ;
    console.log(localStorage.getItem("note_for_sms"));
    //note=localStorage.getItem(note_for_sms);
    axios
      .get(
        "https://www.fast2sms.com/dev/bulkV2?authorization=" +
          SEND_SMS_API_KEY +
          "&route=v3&sender_id=TXTIND&message=" +
          localStorage.getItem("note_for_sms") +
          "&language=english&flash=0&numbers=" +
          mobileno +
          ""
      )
      .then((response) => {
        // console.log(response.status);
        if (response.status == 200) {
          setOpen(true);
        }
      })
      .catch((error) => {
        setOpen1(true);
      });
  }
  function Sendemail(note_for_email) {
    
    //var nameofclient = localStorage.getItem('note_for_sms');
    const message = {
      to: "senkottuvelanscientist@gmail.com",
      from: { name: "Notey!", email: "notes@learnwithtamil.com" },
      subject: "Hello there!",
      html: "<h3>The note you have requested is...</h3><br><h1>"+note_for_email+"<h1>",
    };
    sendMail
      .send(message)
      .then((response) => setOpenEmailsuccess(true))
      .catch((error) => setOpenEmailFailure(true));
  }
  const { notes } = props;
  if (!notes || notes.length === 0) {
    return <p className="mt-5">You haven't created any notes.</p>;
  } else {
    return (
      <>
        <h4 className="container">Your Notes</h4>
        <div className="container mt-4">
          <div className="card-columns">
            {notes.map((note) => {
              return (
                <Card id={note.card_id} key={note.id} className="card p-3">
                  <h6 className="m-0">{note.note}</h6>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="d-flex ml-auto mt-3 text-capitalize font-weight-bold"
                    onClick={() => handleClickOpen(note.note)}
                  >
                    Send SMS
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="d-flex ml-auto mt-3 text-capitalize font-weight-bold"
                    onClick={() => Sendemail(note.note)}
                  >
                    Send Email
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            SMS sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="error">
            SMS Failed!
          </Alert>
        </Snackbar>
        <Snackbar open={openemailsuccess} autoHideDuration={6000} onClose={handleCloseEmailSuccess}>
          <Alert onClose={handleCloseEmailSuccess} severity="success">
            Email sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={openemailfailure} autoHideDuration={6000} onClose={handleCloseEmailFailure}>
          <Alert onClose={handleCloseEmailFailure} severity="error">
            Email Failed!
          </Alert>
        </Snackbar>
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Kindly Enter your Mobile No
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please don't abuse this service!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Mobile No"
              type="string"
              value={open3.mobile}
              onChange={(event) => {
                const { value } = event.target;
                setOpen3({ mobile: value });
              }}
              defaultValue={localStorage.getItem("mobile_for_sms")}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handlesendsms(open3.mobile)} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
