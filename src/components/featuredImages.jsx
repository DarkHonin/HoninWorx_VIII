function FeaturedImage(props){
    return <li onMouseEnter={props.onHover} className={props.selected == props.i ? 'selected' : ''}><img src={props.item.src} alt={props.item.title} /></li>
}

class FeaturedImages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected : -1
        }
        this.onImageRotate = this.onImageRotate.bind(this)
        this.timeout = undefined
    }



    onImageRotate(){
        if(!this.props.featured) return
        this.timeout = setTimeout(this.onImageRotate, 5000)
        this.setState({
            selected : (this.state.selected + 1) % this.props.featured.length
        })
    }
    
    componentDidMount(){
        if(this.props.featured){
            this.setState({selected : 0})
            this.timeout = setTimeout(this.onImageRotate, 5000)
            console.log("Timeout started")
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }

    getSelected(){
        return this.props.featured[this.state.selected]
    }

    render(){
        return <b id='FeaturedImages'>
            <div className='display'>
                <img src={this.state.selected >= 0 ? this.getSelected().src : 'featured.title'} alt={this.state.selected >= 0 ? this.getSelected().title : 'featured.title'}></img>
                <div className='title'>{this.state.selected >= 0 ? this.getSelected().title : 'featured.title'}</div>
            </div>
            <ul>
                {this.props.featured ? this.props.featured.map((e, k) => <FeaturedImage onHover={ () => this.setState({selected : k}) } key={k} i={k} item={e} selected={this.state.selected} /> ) : 'No Featured'}
            </ul>
        </b>
    }
}

module.exports = FeaturedImages