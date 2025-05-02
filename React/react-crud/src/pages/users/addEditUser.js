import { Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, {useEffect, useState} from "react";
import {getUserByID} from "../../redux/actions/UserActions";
import {useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const AddEditUser = () => {

    let heading;
    const params = useParams();
    const url = window.location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    heading = url =="/user/add" ? 'Add User' : 'Update User'

    const getUser = async () => {
        const res = await dispatch(
            getUserByID({
                userId: params.id,
            })
        );
        if(res){
            var value = res?.data;
            setValue('first_name', value.first_name);
            setValue('last_name', value.last_name);
            setValue('login', value.login);
            setValue('email', value.email);
            setValue('phone_no', value.phone_no);
            setValue('node_id', value.node_id);
            setValue('gravatar_id', value.gravatar_id);
            setValue('url', value.url);
            setValue('company', value.company);
            setValue('blog', value.blog);
            setValue('location', value.location);
            setValue('twitter_username', value.twitter_username);
        }
    };

    useEffect(()=> {
        if (!(url ==="/user/add")) {
            getUser();
        }}, []
    );

    const onSubmit = async () => {
        toast("Successfull");
        navigate(-1)
    };
    return (
        <>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white"> {heading} </MDTypography>
                            </MDBox>
                            <div style={{ height: 'auto' }} >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <MDBox mx={5} mt={4} py={3} px={2}>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                    <TextField type="text" id="first_name" label="First Name" fullWidth name="first_name"
                                                               {...register("first_name")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 15}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField type="text" id="last_name" label="Last Name" fullWidth name="last_name"
                                                               {...register("last_name")} InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 15}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}  mt={2}>
                                                    <TextField type="text" id="login" label="Login Name" fullWidth name="login" inputProps={{maxLength: 20}}
                                                               {...register("login", {
                                                                   required: "Login name is required"
                                                               })}
                                                               InputLabelProps={{ shrink: params.id }} helperText={errors.login && errors.login.message} error={!!errors.login}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="email" id="email" label="Email" fullWidth name="email" inputProps={{maxLength: 30}}
                                                               {...register("email",{
                                                                       pattern: {
                                                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                           message: "Invalid email",
                                                                       },
                                                                   }
                                                               )}
                                                               InputLabelProps={{ shrink: params.id }} helperText={errors.email && errors.email.message} error={!!errors.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="number" id="phone_no" label="Phone no" fullWidth name="phone_no"
                                                               {...register("phone_no")} InputLabelProps={{ shrink: params.id }} helperText={errors.phone_no && errors.phone_no.message} error={!!errors.phone_no}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="node_id" label="Node Id" fullWidth name="node_id"
                                                               {...register("node_id")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="gravatar_id" label="Gravatar Id" fullWidth name="gravatar_id"
                                                               {...register("gravatar_id")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="url" label="Url" fullWidth name="url"
                                                               {...register("url")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="company" label="Company" fullWidth name="company"
                                                               {...register("company")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="blog" label="Blog" fullWidth name="blog"
                                                               {...register("blog")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="location" label="Location" fullWidth name="location"
                                                               {...register("location")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} mt={2}>
                                                    <TextField type="text" id="twitter_username" label="Twitter Name" fullWidth name="twitter_username"
                                                               {...register("twitter_username")}  InputLabelProps={{ shrink: params.id }} inputProps={{maxLength: 50}}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} mt={2} sx={{ mx: "10rem" }}container justifyContent="center">
                                                    <MDButton type="submit" variant="gradient" color="info" fullWidth> {heading} </MDButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </MDBox>
                                </form>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </>
    )
}

export default AddEditUser