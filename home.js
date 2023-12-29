function Home(){
    return(
        <Card
            bgcolor="primary"
            txtcolor="white"
            header="Home"
            title="Welcome to the cuttiest bad bank"
            text="All you do here is under your responsibility. Enjoy!"
            body={(<img src="A4.jpg" className="img-fluid" alt="Responsive image"/>)}
        />
    )
}