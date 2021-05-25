
import {Link} from 'react-router-dom'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.state = {expanded: true}
    }
    componentDidMount(){
        window.addEventListener("scroll", this.onScroll)
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.onScroll)
    }

    onScroll(){
        if(window.scrollY == 0)
            this.setState({expanded : true})
        else
            this.setState({expanded : false})
    }

    render(){
        return <div className={`header ${this.state.expanded ? '' : 'small'}` }>
            <div className='logo'>Logo</div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='gallery'>Gallery</Link>
                <Link to='signin'>Sign In</Link>
                <Link to='signup'>Sign Up</Link>
            </nav>
        </div>
    }
}

export default Header
