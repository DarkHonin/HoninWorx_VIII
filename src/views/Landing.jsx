import Page from '../elements/page.jsx'
import Context from '../elements/context.jsx'
import FeaturedImage from '../components/featuredImages.jsx'

class Landing extends React.Component{

    render(){
        const featured = [
            {title : "First", img : "#"},
            {title : "Second", img : "#"},
            {title : "Third", img : "#"},
            {title : "Fourth", img : "#"}
        ]
        return <Page>
            <Context title='Featured images' body={<FeaturedImage featured={featured}/>} />
            <Context />
        </Page>
    }

}

export default Landing