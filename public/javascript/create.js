var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var apiPrefix = "/api/";
var rootList = apiPrefix + "list";

var Sync = function Sync(data) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/create/project";

    return fetch(url, {
        method: 'post',
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (r) {
        if (!r.ok) throw { failure: r };else return r.json();
    });
};

function path(c, name, v, currentPath, t) {
    /** https://stackoverflow.com/a/25404339 */
    var currentPath = currentPath || "root";

    for (var i in c) {
        if (i == name && c[i] == v) {
            t = currentPath;
        } else if (_typeof(c[i]) == "object") {
            return path(c[i], name, v, currentPath + "." + i);
        }
    }

    return t + "." + name;
};

function Note(props) {

    return React.createElement(
        "div",
        null,
        React.createElement(
            "header",
            null,
            React.createElement(
                "span",
                null,
                "Note"
            )
        ),
        React.createElement("div", { className: "body", dangerouslySetInnerHTML: { __html: props.body } })
    );
}

function Note_edit(props) {

    var values = {
        body: props.value
    };

    return React.createElement(
        "div",
        { className: "body el note" },
        React.createElement(
            "header",
            null,
            React.createElement(
                "span",
                null,
                "Edit Note"
            )
        ),
        React.createElement("textarea", { required: true, name: "body", cols: "30", rows: "10", onChange: function onChange(e) {
                return values.body = e.target.value;
            }, defaultValue: values.body }),
        React.createElement(
            "div",
            { className: "el link" },
            React.createElement(
                "a",
                { className: "body notitle", title: "Add note", onClick: function onClick() {
                        return props.onSubmit ? props.onSubmit(values.body) : pass;
                    } },
                React.createElement("i", { className: "fas fa-save" })
            )
        )
    );
}

var Editor = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        _this.state = { editing: false };
        return _this;
    }

    _createClass(Editor, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var item = this.props.item ? this.props.item : { title: '', note: '' };
            return React.createElement(
                "div",
                { style: { minWidth: '50%' } },
                React.createElement(
                    "header",
                    null,
                    this.props.type,
                    " ",
                    React.createElement(
                        "span",
                        null,
                        this.state.editing ? React.createElement("input", { type: "text", onChange: function onChange(e) {
                                return item.title = e.target.value;
                            }, defaultValue: item.title }) : item.title
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "header",
                        null,
                        React.createElement(
                            "span",
                            null,
                            "Note"
                        )
                    ),
                    this.state.editing ? React.createElement("textarea", { onChange: function onChange(e) {
                            return item.note = e.target.value;
                        }, defaultValue: item.note }) : React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.item ? this.props.item.note_md : '' } })
                ),
                React.createElement(
                    "footer",
                    null,
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            this.state.editing ? React.createElement(
                                "span",
                                { onClick: function onClick() {
                                        return (_this2.state.editing = false) & _this2.props.onChange({ title: item.title, note: item.note }, _this2.props.type);
                                    } },
                                React.createElement("i", null)
                            ) : this.props.item ? React.createElement(
                                "span",
                                { onClick: function onClick() {
                                        return (_this2.state.editing = true) & _this2.forceUpdate();
                                    } },
                                React.createElement("i", null)
                            ) : React.createElement(
                                "span",
                                { onClick: function onClick() {
                                        return (_this2.state.editing = true) & _this2.forceUpdate();
                                    } },
                                React.createElement("i", null)
                            ),
                            React.createElement(
                                "span",
                                null,
                                React.createElement("i", null)
                            ),
                            React.createElement(
                                "span",
                                null,
                                React.createElement("i", null)
                            ),
                            React.createElement(
                                "span",
                                null,
                                React.createElement("i", null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Editor;
}(React.Component);

function Item(props) {
    var state = {
        toggle: false
    };
    return React.createElement(
        "li",
        { "data-type": props.type, key: props.skey },
        React.createElement(
            "span",
            { className: "title" },
            props.item.title
        ),
        React.createElement(
            "span",
            { className: "note" },
            props.item.note
        ),
        React.createElement(
            "span",
            null,
            React.createElement(
                "span",
                { className: "timestamp", title: props.item.createdAt },
                React.createElement("i", null)
            ),
            React.createElement(
                "a",
                { onClick: function onClick() {
                        return state.toggle = !state.toggle;
                    } },
                React.createElement("i", null)
            )
        ),
        state.toggle && React.createElement(Editor, { item: props.item, onChange: props.update, type: this.props.type })
    );
}

var Item_list = function (_React$Component2) {
    _inherits(Item_list, _React$Component2);

    function Item_list(props) {
        _classCallCheck(this, Item_list);

        var _this3 = _possibleConstructorReturn(this, (Item_list.__proto__ || Object.getPrototypeOf(Item_list)).call(this, props));

        _this3.state = {
            item: null
        };
        return _this3;
    }

    _createClass(Item_list, [{
        key: "update",
        value: function update(item) {
            var _this4 = this;

            Sync(Object.assign({
                action: this.state.item ? "update" : "create",
                type: this.props.type
            }, item), "/create").then(function (t) {
                if (!t.project) return;
                var project = _this4.state.projects[t.project._id];
                _this4.state.project = project = t.project;
                if (!t.post) return;

                var post = project.posts.find(function (v) {
                    return console.log(v) && v._id == t.post_id;
                });
                _this4.state.post = post = t.post;
            }.bind(this)).then(function () {
                return _this4.forceUpdate();
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.state.editing = true;this.forceUpdate();
        }
    }, {
        key: "close",
        value: function close() {
            this.state.editing = false;this.forceUpdate();
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var items = this.props.items.map(function (item, k) {
                return React.createElement(Item, { key: k, skey: k, item: item, update: _this5.update.bind(_this5) });
            }.bind(this));
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    this.props.type,
                    "'s"
                ),
                React.createElement(
                    "ul",
                    { className: "body" },
                    this.props.items && items
                )
            );
        }
    }]);

    return Item_list;
}(React.Component);

var Create = function (_React$Component3) {
    _inherits(Create, _React$Component3);

    function Create(props) {
        _classCallCheck(this, Create);

        var _this6 = _possibleConstructorReturn(this, (Create.__proto__ || Object.getPrototypeOf(Create)).call(this, props));

        _this6.project = {};
        _this6.state = { project: null, post: null, markdown: "", select: _this6.props.target || ['project_id'], projects: {} };
        return _this6;
    }

    _createClass(Create, [{
        key: "sync",
        value: function sync(data) {
            var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/create/project";

            return fetch(url, {
                method: 'post',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(function (r) {
                if (!r.ok) throw { failure: r };else return r.json();
            });
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

    }, {
        key: "create",
        value: function create(item, kind) {
            var _this7 = this;

            this.sync(Object.assign({
                action: "create",
                project_id: kind == 'post' ? this.state.select[0] : null
            }, item), "/create").then(function (t) {
                if (!t.project) return;
                _this7.state.project = _this7.state.projects[t.project._id] = t.project;
                if (!t.post) return;
                _this7.state.projects[t.project._id].posts.push(t.post);
                _this7.state.post = _this7.state.projects[t.project._id][0];
            }.bind(this)).then(function () {
                return _this7.forceUpdate();
            });
        }
    }, {
        key: "select_item",
        value: function select_item(item, kind) {
            console.log(kind, item);
            switch (kind) {
                case 'project':
                    console.log("setting project");
                    this.state.select[0] = item._id;
                    this.state.project = item;
                    break;
                case 'post':
                    this.state.select[1] = item._id;
                    this.state.post = item;
                    break;
            }
            this.forceUpdate();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "editor" },
                this.state.projects && React.createElement(Item_list, { items: Object.values(this.state.projects), type: "project", item_select: this.select_item.bind(this) }),
                React.createElement(
                    "article",
                    null,
                    React.createElement(
                        "header",
                        null,
                        "Editor"
                    )
                )
            );
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this8 = this;

            this.sync({}, rootList).then(function (j) {
                return _this8.state.projects = j;
            }).then(function () {
                return _this8.forceUpdate();
            });

            // .then((project_id) => this.sync({},`/project/${project_id}`))
            // .then(j => (this.project=j.project) && (this.state.item=j.project) && (this.state.markdown=j.markdown)).then(this.handlers.forece_update)
        }
    }]);

    return Create;
}(React.Component);

var root = document.getElementById("create_root");
var urlParams = new URLSearchParams(window.location.search);
var projectID = urlParams.get('project');
var postID = urlParams.get('post');

ReactDOM.render(React.createElement(Create, { target: [projectID, postID] }), root);