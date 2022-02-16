import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <BrowserRouter>
      <Nav />
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        {children}
      </Container>
    </BrowserRouter>
  )
};

export default Layout;
