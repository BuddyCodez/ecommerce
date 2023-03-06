import { Loading } from "@nextui-org/react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children, active }) => {
  return (
    <>
      <Header active={active}>
        <main>{children}</main>
        <Footer />
        <a href="#top" className="go-top" data-go-top>
          <ion-icon name="chevron-up"></ion-icon>
        </a>
      </Header>

    </>
  );
};
export default Layout;