import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Button,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Mail } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
const RegisterFrom = ({invertToggleFlag}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {

  }
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
            Register
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: "100%" }}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Enter Full Name"
            label="Full Name"
          />
          <TextField
            variant="outlined"
            sx={{ width: "100%", marginTop: "10px" }}
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
            label="Email Address"
          />
          <TextField
            variant="outlined"
            type="password"
            sx={{ width: "100%", marginTop: "10px" }}
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
          <TextField
            variant="outlined"
            type="password"
            sx={{ width: "100%", marginTop: "10px" }}
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
            placeholder="Confirm Password"
            label="Confirm Password"
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
              onClick={handleRegister}
              // onKeyDown={handleKeyDown}
            >
              Register
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
                Already Registered?{" "}
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
                  Log In
                </Button>
              </Typography>
            </DialogActions>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default RegisterFrom;
