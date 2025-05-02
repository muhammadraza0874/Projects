import Users from  "./components/Dashboard/Users/allUsers"
import AddEditUser from "pages/users/addEditUser";

const routes = [
  {
    route: "/users",
    component: <Users />,
  },
  {
    key: "user_edit",
    route: "/user/edit/:id",
    component: <AddEditUser />,
  },
  {
    route: "/user/add",
    component: <AddEditUser />,
  },
];

export default routes;
