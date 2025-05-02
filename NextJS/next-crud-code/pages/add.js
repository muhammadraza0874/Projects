import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//Components
import {
  Stack,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
//Icons
import {
  Visibility,
  VisibilityOff,
  ChevronLeftRounded,
} from "@mui/icons-material";
//Utils
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function addEdit(props) {
  const studentRows = props?.studentRows;
  const isAddMode = !studentRows;
  const router = useRouter();
  const [gender, setGender] = React.useState("");
  const [dob, setDob] = React.useState(null);

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  }

  //FormValidations

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    email: Yup.string()
      .required("Please enter your email")
      .email("Email is invalid"),
    age: Yup.string()
      .required("Please enter your age")
      .max(3, "Age cannot greater than three digits"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <div className="wrapper">
        <Link href="/">
          <Button className="btn backBtn" startIcon={<ChevronLeftRounded />}>
            Back
          </Button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="heading">
            {isAddMode ? "Add Student" : "Edit Student"}
          </div>
          <Stack className="formGrid">
            <TextField
              id="fname"
              label="First name*"
              type="text"
              variant="outlined"
              {...register("firstName", { required: true })}
              helperText={
                errors.firstName?.message ? errors.firstName?.message : ""
              }
              error={errors.firstName?.message ? true : false}
            />
            <TextField
              id="lname"
              label="Last name*"
              type="text"
              variant="outlined"
              {...register("lastName", { required: true })}
              helperText={
                errors.lastName?.message ? errors.lastName?.message : ""
              }
              error={errors.lastName?.message ? true : false}
            />
            <TextField
              id="email"
              label="Email*"
              type="email"
              variant="outlined"
              {...register("email", { required: true })}
              helperText={errors.email?.message ? errors.email?.message : ""}
              error={errors.email?.message ? true : false}
            />
            <TextField
              id="number"
              label="Phone Number"
              type="number"
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              id="age"
              label="Age*"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              {...register("age", { required: true })}
              helperText={errors.age?.message ? errors.age?.message : ""}
              error={errors.age?.message ? true : false}
            />
            <FormControl>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              type="text"
            />
            <TextField
              id="address-2"
              label="Address 2 (Optional)"
              variant="outlined"
              type="text"
            />
          </Stack>
          <Button
            sx={{ mt: 3, minWidth: 100 }}
            className="btn btnGreen"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default addEdit;
