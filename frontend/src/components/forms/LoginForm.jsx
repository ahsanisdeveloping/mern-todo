import {
  Backdrop,
  // Alert,
  Card,
  Box,
  Button,
  TextField,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  FormControlLabel,
  IconButton,
  Slide,
  Typography,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Mail } from "@mui/icons-material";
import { Alert } from "@mui/joy";
import { useState } from "react";
const LoginForm = ({ invertToggleFlag }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignin = () => {
    fetch("http://localhost:3001/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: 123,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card
      elevation={10}
      className="innerCard"
      sx={{ margin: "50px auto", width: 400, borderRadius: "30px" }}
    >
      <Box sx={{ width: 300, padding: "50px" }}>
        <div>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontWeight: "700",
              textAlign: "center",
              fontFamily: "Helvetica",
              marginBottom: "20px",
            }}
          >
            Sign in
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Enter Email Address"
            helperText="We'll use your email address for authentication"
            label="Email Address"
          />
          <TextField
            variant="outlined"
            type="password"
            sx={{ width: "100%", marginTop: "5px" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Enter Password"
            label="Enter Password"
            required
          />

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              sx={{
                marginTop: "10px",
              }}
              variant="contained"
              size={"large"}
              onClick={handleSignin}
              // onKeyDown={handleKeyDown}
            >
              Sign in
            </Button>
          </Box>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogActions sx={{ alignSelf: "center" }}>
              <Typography
                variant="body2"
                color="#505050"
                style={{
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Not a member yet?{" "}
                <Button
                  // to=""
                  onClick={invertToggleFlag}
                  color="primary"
                  style={{
                    textDecoration: "underline",
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Sign up
                </Button>
              </Typography>
            </DialogActions>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default LoginForm;
