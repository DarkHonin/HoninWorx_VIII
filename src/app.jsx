import Header from './elements/header.jsx'
import Footer from './elements/footer.jsx'

class App extends React.Component{

    render(){
        return <main>
            <Header />
            <div className='page'></div>
            <Footer />
        </main>
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );