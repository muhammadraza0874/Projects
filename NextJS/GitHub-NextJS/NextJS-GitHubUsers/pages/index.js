import { React, useState, useEffect } from "react";
import Link from "next/link";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//Components
import { Button, Stack, Modal, Box, Typography } from "@mui/material";
import AddEditBtn from "./../components/AddEditBtn";
//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

//Utils
import { studentRows } from "../utils/data";
import CustomPagination from "./../utils/CustomPagination";
import NoResultFound from "./../utils/NoResultFound";
import API from '../utils/api';
import Avatar from '@mui/material/Avatar';


const styles = {
  toolBar: {
    "& .MuiDataGrid-toolbarContainer": {
      padding: "15px 10px",
    },
  },
  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "100%",
    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 15,
    p: 3,
    textAlign: "center",
  },
};

export default function Student() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [deleteId, setDeleteId] = useState("");
  const handleClose = () => setOpen(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    handleOpen(true);
  };

  const handleChange = () => {
    setData(data.filter((item) => item.id !== deleteId));
    handleClose(true);
  };

  const getStudents = async () => {
    const res = await API.get("/users");
    if(res){
      setData(res?.data);
    }
  }

  useEffect(async ()=> {
    await getStudents();
  });

  const columns = [
    {
      field: "id",
      sortable: false,
      headerName: "ID",
      width: 70,
    },
    {
      field: "avatar_url", headerName: "Avatar", sortable: false, filter:false, renderCell: (props) => {
        return (
            <Stack direction="row">
              <Avatar alt="Avatar" src={`${props.row.avatar_url}`} />
            </Stack>
        );
      },
    },
    {
      field: "login",
      headerName: "Login Name",
      width: 180,
    },
    {
      field: "node_id",
      headerName: "Node Id",
      width: 250,
    },
    {
      field: "type",
      headerName: "User Type",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (props) => {
        return (
          <Stack direction="row" spacing={0.5}>
            <Link href={`/edit/${props.row.id}`} className="btnEdit">
              <EditIcon sx={{ color: "green" }} />
            </Link>

            <DeleteIcon
              color="danger"
              onClick={() => handleDelete(props.row.id)}
              sx={{ color: "red" }}
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <div className="wrapper">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" className="pageTitle">
          Students
        </Typography>
        <AddEditBtn
          link="/add"
          showTitle={true}
          showIcon={true}
          title="Create"
          icon={<AddIcon />}
        />
      </Stack>
      <DataGrid
        autoHeight
        pagination
        hover
        rows={data}
        columns={columns}
        pageSize={10}
        componentsProps={{
          toolbar: { showQuickFilter: true },
        }}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: NoResultFound,
          Pagination: CustomPagination,
        }}
        disableColumnMenu
        sx={styles.toolBar}
      />
      <Modal open={open} aria-describedby="delete">
        <Box sx={styles.popup}>
          <Typography id="delete">
            Are you sure you want to delete this record?
          </Typography>
          <Stack
            direction="row"
            sx={{ mt: 2 }}
            justifyContent="center"
            spacing={1}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleChange()}
            >
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
