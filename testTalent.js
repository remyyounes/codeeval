
function startsWith( subject, search ){
    for(var i=0; i<search.length; i++) if(subject[i] != search[i]) return false;
    return true;
}

function findUsers(usernames, query){
    var users = [];
    for(var i=0; i<usernames.length; i++){
        if( startsWith(usernames[i].toLowerCase(), query.toLowerCase()) ){
            users.push(usernames[i]);
        }
    }
    return users;
}

function typeahead(usernames, queries) {
    for( var i=0; i<queries.length; i++){
         var users = findUsers(usernames, queries[i]);
         console.log( users.length ? users[0] : '-1');
    }
}





typeahead(["james","jBlank"], ["j","jm","jbl","JB"]);