
class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div className='footer'>
            <div className='tnc'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>T'c & C's</a>
            </div>
            <div className='links'>
                <a href='#'>Home</a>
                <a href='#'>About</a>
                <a href='#'>Sign Up / Sign In</a>
            </div>
        </div>
    }
}

module.exports = Footer
