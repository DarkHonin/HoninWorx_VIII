
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
                <a href='./'>Home</a>
                <a href='./'>Gallery</a>
                <a href='./'>Sign Up/Sign In</a>
            </nav>
        </div>
    }
}

module.exports = Header
