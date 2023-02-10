import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <a href="#top" class="go-top" data-go-top>
        <ion-icon name="chevron-up"></ion-icon>
      </a>
    </>
  );
};
export default Layout;