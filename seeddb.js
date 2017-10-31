var argv = require('minimist')(process.argv.slice(2));
var Parse = require('parse/node');
Parse._initialize(argv.appId, 'unused', argv.masterKey);
Parse.serverURL = argv.serverURL;
console.log(argv);
seed();
var STRING = {
    type: "String"
}
var DATE_TIME = {
    type: "DateTime"
}
var NUMBER = {
    type: "Number"
}
var ARRAY = {
    type: "Array"
}
var OBJECT = {
    type: "Object"
}
var FILE = {
    type: "File"
}
var POINTER = (targetClass) => {
    return {
        type: "Pointer",
        targetClass: targetClass
    }
}

function seed(){
    Parse._request('DELETE', 'schemas/Posts', {}, {useMasterKey : true})
    .then(Parse._request('DELETE', 'schemas/Comments', {}, {useMasterKey : true}))
    .then(Parse._request('DELETE', 'schemas/Likes', {}, {useMasterKey : true}))
    .then(Parse._request('DELETE', 'schemas/Attachments', {}, {useMasterKey : true}));

    createUsersSchema()
    .then(createPostsSchema)
    .then(createCommentsSchema)
    .then(createLikesSchema)
    .then(createAttachmentsSchema);
}

function createUsersSchema(){
    var fields = {
        className: "_User",
        fields: {
            bio: STRING,
            firstName: STRING,
            lastName: STRING,
            avatar: FILE,
            birthDate: DATE_TIME
        }
    }
    return Parse._request('PUT', 'schemas/_User', fields, {useMasterKey : true});
};

function createPostsSchema(){
    var fields = {
        className: "Posts",
        fields: {
            content: STRING,
            attachments: ARRAY,
            source: STRING,
            sourcePost: OBJECT,
            user: POINTER("_User"),
            likes: ARRAY,
            comments: ARRAY,
            numberOfLikes: NUMBER,
            numberOfComments: NUMBER
        }
    }
    return Parse._request('POST', 'schemas/Posts', fields, {useMasterKey : true});
}

function createCommentsSchema(){
    var fields = {
        className: "Comments",
        fields: {
            content: STRING,
            likes: ARRAY,
            comments: ARRAY,
            numberOfLikes: NUMBER,
            numberOfComments: NUMBER,
            post: POINTER("Posts"),
            comment: POINTER("Comments")
        }
    }
    return Parse._request('POST', 'schemas/Comments', fields, {useMasterKey : true});
}

function createLikesSchema(){
    var fields = {
        className: "Likes",
        fields: {
            user: POINTER("Users"),
            post: POINTER("Posts")
        }
    }
    return Parse._request('POST', 'schemas/Likes', fields, {useMasterKey : true});
}

function createAttachmentsSchema(){
    var fields = {
        className: "Attachments",
        fields: {
            name: STRING,
            sourceURL: STRING,
            type: STRING,
            post: POINTER("Posts"),
            user: POINTER("Users")
        }
    }
    return Parse._request('POST', 'schemas/Attachments', fields, {useMasterKey : true});
}