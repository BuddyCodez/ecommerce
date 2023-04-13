import Header from "../components/Header";

export default function Layout({ children , categories}) {
    return (<>
        <Header categories={categories}/>
        <main>
            {children}
        </main>
    </>);
}
