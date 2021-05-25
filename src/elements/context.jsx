class Context extends React.Component{
    render(){
        return <div className='context'>
            <div className="header">{this.props.title ? this.props.title : 'context.title'}</div>
            <div className="body">{this.props.body ? this.props.body : 'context.body'}</div>
        </div>
    }
}

module.exports = Context