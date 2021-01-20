const apiPrefix = "/api/"
const rootList = apiPrefix+"list"

const Sync = (data, url = `/create/project`) => {
    return fetch(url, {
        method : 'post',
        headers : {
            "content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }).then(r => {
        if(!r.ok)
            throw {failure : r};
        else
            return r.json() 
    })
}

function path(c, name, v, currentPath, t){
    /** https://stackoverflow.com/a/25404339 */
    var currentPath = currentPath || "root";

    for(var i in c){
      if(i == name && c[i] == v){
        t = currentPath;
      }
      else if(typeof c[i] == "object"){
        return path(c[i], name, v, currentPath + "." + i);
      }
    }

    return t + "." + name;
};

function Note(props){

    return <div >
        <header >
            <span>Note</span>
        </header>
        <div className='body' dangerouslySetInnerHTML={{__html : props.body}} ></div>
        
    </div>
}

function Note_edit(props){

    const values = {
        body : props.value
    }

    return <div className='body el note'>
            <header >
                <span>Edit Note</span>
            </header>
            <textarea required name="body" cols="30" rows="10"  onChange={(e) => values.body = e.target.value} defaultValue={values.body}></textarea>
            <div className='el link'>
                <a className='body notitle' title="Add note" onClick={() => props.onSubmit ? props.onSubmit(values.body) : pass }>
                    <i className='fas fa-save'></i>
                </a>
            </div>
        </div>
}

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.state = {editing : false }
    }

    render(){
        const item = (this.props.item ? this.props.item : {title : '',note : ''})
        return <div  style={{minWidth:'50%'}}>
                    <header >
                        {this.props.type} <span >{this.state.editing ? <input type='text' onChange={(e) => item.title=e.target.value}  defaultValue={item.title}/> : item.title}</span>
                    </header>
                    <div >
                        <header >
                            <span>Note</span>
                        </header>
                            {this.state.editing ? <textarea onChange={(e) => item.note=e.target.value} defaultValue={item.note} /> :
                            <div  dangerouslySetInnerHTML={{__html: (this.props.item ? this.props.item.note_md : '')}}/>
                        }
                    </div>
                    <footer>
                        <div >
                            <div >
                            {this.state.editing ?
                                <span  onClick={()=>(this.state.editing = false) & this.props.onChange({title : item.title, note : item.note}, this.props.type)}>
                                    <i ></i>
                                </span>
                             : 
                                (this.props.item ?
                                    <span  onClick={()=>(this.state.editing = true) & this.forceUpdate()}>
                                        <i ></i>
                                    </span>
                                    :
                                    <span  onClick={()=>(this.state.editing = true) & this.forceUpdate()}>
                                        <i ></i>
                                    </span>
                                )
                             }
                                <span >
                                    <i ></i>
                                </span>
                                <span >
                                    <i ></i>
                                </span>
                                <span >
                                    <i ></i>
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
    }
}

function Item(props) {
    const state = {
        toggle : false
    }
    return <li data-type={props.type} key={props.skey}>
        <span className='title'>{props.item.title}</span>
        <span className='note'>{props.item.note}</span>
        <span>
            <span className='timestamp' title={props.item.createdAt}><i ></i></span>
            <a  onClick={() => state.toggle = !state.toggle}>
                <i ></i>
            </a>
        </span>
        {state.toggle && <Editor item={props.item} onChange={props.update} type={this.props.type} />}
    </li>
}

class Item_list extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            item : null
        }
    }
    
    update(item){
        Sync({
            action : this.state.item ? "update" : "create",
            type : this.props.type,
            ...item
        }, `/create`).then(((t) => {
            if(!t.project) return
            let project = this.state.projects[t.project._id]
            this.state.project = project = t.project
            if(!t.post) return

            let post = project.posts.find(v => console.log(v) && v._id == t.post_id)
            this.state.post = post = t.post

        }).bind(this)).then(() => this.forceUpdate())
    }

    open(){this.state.editing = true; this.forceUpdate()}
    close(){this.state.editing = false; this.forceUpdate()}


    render(){
        const items = this.props.items.map(((item, k) => <Item key={k} skey={k} item={item} update={this.update.bind(this)} />).bind(this)
   )
        return <div >
            <header >
                {this.props.type}'s
                {/* May add toggle button */}
            </header>
            <ul className='body'>
                {this.props.items && items}
            </ul>
        </div>
    }  
}
class Create extends React.Component{
    constructor(props){
        super(props)
        this.project = {}
        this.state = {project : null, post : null, markdown : "", select : this.props.target || ['project_id'], projects : {}}
    }

    sync(data, url = `/create/project`){
        return fetch(url, {
            method : 'post',
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(r => {
            if(!r.ok)
                throw {failure : r};
            else
                return r.json() 
        })
    }

    // update(item){
    //     this.sync({
    //         action : this.state.select[0] ? "update" : "create",
    //         project_id : this.state.select[0],
    //         post_id : this.state.select[1],
    //         ...item
    //     }, `/create`).then(((t) => {
    //         if(!t.project) return
    //         let project = this.state.projects[t.project._id]
    //         this.state.project = project = t.project
    //         if(!t.post) return

    //         let post = project.posts.find(v => console.log(v) && v._id == t.post_id)
    //         this.state.post = post = t.post

    //     }).bind(this)).then(() => this.forceUpdate())
    // }

    create(item, kind){
        this.sync({
            action : "create",
            project_id : (kind == 'post' ? this.state.select[0] : null),
            ...item
        }, `/create`).then(((t) => {
            if(!t.project) return
            this.state.project = this.state.projects[t.project._id] = t.project
            if(!t.post) return
            this.state.projects[t.project._id].posts.push(t.post)
            this.state.post = this.state.projects[t.project._id][0]

        }).bind(this)).then(() => this.forceUpdate())
    }

    select_item(item, kind){
        console.log(kind, item)
        switch(kind){
            case 'project':
                console.log("setting project")
                this.state.select[0] = item._id
                this.state.project = item
                break
            case 'post':
                this.state.select[1] = item._id
                this.state.post = item
                break
        }
        this.forceUpdate()
    }

    render(){
        return <div className="editor">
                {this.state.projects && <Item_list items={Object.values(this.state.projects)} type='project' item_select={this.select_item.bind(this)} />}
                <article >
                    <header >
                        Editor
                    </header>
                    {/* <Editor item={this.state.project} onChange={this.update.bind(this)} type={'project'}/> */}
                    {/* {this.state.project && <Editor item={this.state.post} onChange={this.update.bind(this)} type={'post'}/> }     */}
                </article>
                
                {/* {this.state.project && <Item_list items={Object.values(this.state.project.posts)} type='post' item_select={this.select_item.bind(this)}/>} */}
                            
            </div>
    }
    componentWillUnmount(){
    }

    componentDidMount(){
        
        this.sync({}, rootList).then(j => this.state.projects = j).then(() => this.forceUpdate())

        // .then((project_id) => this.sync({},`/project/${project_id}`))
        // .then(j => (this.project=j.project) && (this.state.item=j.project) && (this.state.markdown=j.markdown)).then(this.handlers.forece_update)
    }
}

const root = document.getElementById("create_root")
const urlParams = new URLSearchParams(window.location.search);
const projectID = urlParams.get('project');
const postID = urlParams.get('post');

ReactDOM.render(<Create target={[projectID, postID]} />, root)