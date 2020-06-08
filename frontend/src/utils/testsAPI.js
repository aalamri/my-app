const fetch = require("node-fetch");

export const getTest = async (id) => {
    let error = null, json = {};
    try {
        const url = `http://localhost:1337/tests/${id}`; // TODO
        const response = await fetch(url);
        json = await response.json();
    } catch (err) {
        error = err;
    }
    const res = (error || json.error) ? { error: explainedError(error, id) } : { test: json };
    return res;
};

function explainedError(error, id) {
    // TODO 
    // console.log("Explain this error and return it in json friendly format to be uesd in the UI:", error);
    // error cases:
    // invalid id
    // server error
    // deleted test
    // test is pending
    // return `Error ...`;
    return `Error fetching test id ${id}`;
}

export const getHelloNote = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('Hello from Redux!');
        }, 500);
    });
};
