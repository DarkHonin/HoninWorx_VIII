import Header from './elements/header.jsx'
import Footer from './elements/footer.jsx'

import Landing from './views/Landing.jsx'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component{
    render(){
        return <main>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="*">
                        <h2>404</h2>
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </main>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );