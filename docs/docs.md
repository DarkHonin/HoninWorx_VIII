# HoninWorx API

## Usage
/`project`/`post`/`media` / Actions[**list**, **create**, **update**, **delete**]


|    | URL                                   |  Payload                                | Detail                                                                |
|----|:--------------------------------------|:----------------------------------------|-----------------------------------------------------------------------|
|`Project`| /`create`                             | { title : String, note : String }       |Creates a new `project` and responds as json                           |
|    | /`list`                               | { limit : Number, offset : Number, order_by: string }|Fetches a list of `projects` within the criteria          |
|    | /`5fe4783949d8e82968796e27`           | { void }                                |Fetches the `project` as json                                            |
|    | /`5fe4783949d8e82968796e27`/update    | { title : String, note : String }       |Updates the `project` detail and responds with boolean                 |
|    | /`5fe4783949d8e82968796e27`/delete    | { check : String }                      |Deletes the `project` should the check pass                            |
|||||
|`Post`| /`5fe4783949d8e82968796e27`/list    | { limit : Number, offset : Number, order_by: string }       |Fetches a list of `posts` within the criteria          |
|    | /`5fe4783949d8e82968796e27`/create    | { title : String, note : String }       |Creates a new `post` under the specified `project` and responds as json|
|    | /`5fe4783949d8e82968796e27`/`5fd0e9e676dcfd2468f21286`    | { void }            |Fetches the `post` as json                                            |
|    | /`...`/`5fd0e9e676dcfd2468f21286`/update    | { title : String, note : String }       |Updates the `post` detail and responds with boolean                 |
|    | /`...`/`5fd0e9e676dcfd2468f21286`/delete    | { check : String }                      |Deletes the `post` should the check pass                            |
|||||
|`Media`| /`...`/`5fd0e9e676dcfd2468f21286`/create    | { ?}       |Creates a new `media` under the specified `post & project` and responds as json|
|    | /`...`/`...`/`5fd0ea0b77225142105a7cc9`    | { void }            |Fetches the `post` as json                                            |
---

---
## Schema
### Project
    _id : ObjectID,
    title : String,
    note : String,
    posts : [Post],
    createdAt : DateTime,
    updatedAt : DateTime
---
### Post
    _id : ObjectID,
    title : String,
    note : String,
    media : [Media],
    createdAt : DateTime,
    updatedAt : DateTime
---
### Media
    _id : ObjectID,
    type : ['img', 'vid', ... ],
    src : URLString,
    createdAt : DateTime,
    updatedAt : DateTime,
---




