import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllUsers} from '../../../redux/actions/UserActions'
import MDBox from "../../MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../MDTypography";
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Icon, IconButton, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faPencil, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import {useConfirm} from "material-ui-confirm";
import AddIcon from '@mui/icons-material/Add';
import {toast} from "react-toastify";
import Avatar from '@mui/material/Avatar';


const AllUsers = () => {

    const confirm = useConfirm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [userData, setUserData] =useState([]);
    const [show, setShow] = useState(false);
    const handleDelete = () => {
        confirm({ description: 'You want to delete user' })
            .then( () => {
                toast("User deleted Successfully ")
            }).catch(() => {
            console.log("error")
        });

    }
    const columns = [
        { field: "id", headerName: 'Id'},
        {
            field: "avatar_url", headerName: "Avatar", sortable: false, filter:false, renderCell: (props) => {
                return (
                    <Stack direction="row">
                        <Avatar alt="Avatar" src={`${props.row.avatar_url}`} />
                    </Stack>
                );
            },
        },
        { field: 'login', headerName: 'Login Name', flex:1},
        { field: 'node_id', headerName: 'Node Id', flex:1},
        { field: 'type', headerName: 'User Type',  flex:1 },
        {
            field: "actions", headerName: "Action", sortable: false, filter:false, flex:1, renderCell: (props) => {
                return (
                    <Stack direction="row" >
                        <IconButton aria-label="detail">
                            <FontAwesomeIcon icon={faEye} title="Detail" size="xs" onClick={ () => {
                                setShow(true)
                                setUserData(props.row);
                            }}/>
                        </IconButton>
                        <IconButton aria-label="edit">
                            <FontAwesomeIcon icon={faPencil} title="Edit" size="xs" onClick={() => {
                                        navigate(`/user/edit/${props.row.id}`)
                                    }}/>
                        </IconButton>
                        <IconButton aria-label="delete">
                            <FontAwesomeIcon icon={faTrash} title="Delete" size="xs" onClick={() => handleDelete(props.row.id)}/>
                        </IconButton>
                    </Stack>
                );
            },
        },
      ];
      const getStudents = async () => {
        const res = await dispatch(
            getAllUsers()
        );
        if(res){
            setData(res?.data);
        }
    }
    useEffect(async ()=> {
            await getStudents();
    });

    return(
        <>
            <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                            <MDTypography variant="h6" color="white"> All Users </MDTypography>
                            <Fab variant="extended" aria-label="add"title="Add User" style={{  float: 'right'}} sx={{mt: "-20px"}} onClick={() => {
                                navigate(`/user/add`)
                            }}>
                                <AddIcon fontSize="small"/>
                            </Fab>

                        </MDBox>
                        <div style={{ height: 700 }}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                                checkboxSelection
                            />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>

        <Modal show={show} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>User Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table table-striped table-bordered">
                    <tbody id="user-details-table">
                    <tr><th>Login:</th><td colspan="5">{userData.login}</td></tr>
                    <tr><th>Node Id:</th><td colspan="5">{userData.node_id}</td></tr>
                    <tr><th>User Type:</th><td colspan="5">{userData.type}</td></tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ () => {
                    setShow(false)
                    setUserData("");
                }}> Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AllUsers;