const base_url = "http://localhost:3000/api/user/"

async function login() {
    try {
        let req = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }

        const res = await fetch(base_url + "login", req);

        if (res.ok) {
            const data = await res.json();

            if (data.statusCode == 200) {
                localStorage.token = data.token;
                window.location.assign("/dashboard.html");
            } else {
                throw new Error((data.err !== undefined) 
                ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.err.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                : `${data.statusCode}: ${data.message}`)
            }


        } else {
            throw new Error(`${res.status}, ${res.statusText}`)
        }
    } catch(e) {
        console.log(e.toString());
    }
}

async function addUser() {
    let email = prompt("[Add User] Enter user's email", "someone@example.com");
    let password = prompt("[Add User] Enter user's password", "Test12345");
    let name = prompt("[Add User] Enter user's name", "Hammad Nasir");

    if (email != null && password != null && name != null) {
        let data = await apiCaller(base_url + "add", {email: email, password: password, name: name}, 203, JSON.stringify);
    
        alert(data)
        console.log(data);
    }
}

async function delUser() {
    let email = prompt("[Add User] Enter user's email", "someone@example.com");

    if (email != null) {
        let data = await apiCaller(base_url + "del", {email: email}, 203, JSON.stringify);
    
        alert(data)
        console.log(data);
    }
}

async function getUsers() {
    let data = await apiCaller(base_url + "get", {}, 200, JSON.stringify);
    
    alert(data)
    console.log(data);
}

/**
API Caller helper to refactor common API code that requires bearer tokens (all http requests have POST method)
@param {string} api API URL
@param {object} body body needed for the API call (pass as empty object if not needed)
@param {number} successCode success status code e.g. 200
@param {function} dataReturner data returning function, processes data to return it in a specific format
@param {function} rejectWithValue  rejectWithValue function for that specific async thunk that calls it
*/

async function apiCaller(api, body, successCode, dataReturner, ) {
    try {
        let req_init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`, 
            },
        }
        // if body is an empty object, do not include it
        if (!(Object.keys(body).length === 0 && body.constructor === Object)){
            req_init['body'] = JSON.stringify(body);
        }
        
        const res = await fetch(api, req_init);
        
        if (res.ok) {
            const data = await res.json()
            if (data.statusCode != successCode) {
                throw new Error((data.err !== undefined) 
                ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.err.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                : `${data.statusCode}: ${data.message}`) 
            }
            return dataReturner(data)
        }
        throw new Error(`${res.status}, ${res.statusText}`) 
    }
    catch (err) {
        return err.toString()
    }
}