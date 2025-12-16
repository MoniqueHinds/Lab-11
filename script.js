
var fetchBtn = document.getElementById('fetchBtn');
var fetchBtn2 = document.getElementById('fetchBtn2');
var resultDiv = document.getElementById('result');
var postForm = document.getElementById('postForm');
var putForm = document.getElementById('putForm');
var deleteForm = document.getElementById('deleteForm');

fetchBtn.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            resultDiv.innerHTML = "<h3>" + data.title + "</h3><p>" + data.body + "</p>";
        })
        .catch(function (error) {
            if (error.message.includes("Network")) {
                resultDiv.innerHTML = "<p style='color:red;'>Network error: please check your connection</p>";
            } else {
                resultDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
            }
        });
});

fetchBtn2.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/2')
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            resultDiv.innerHTML = "<h3>" + data.title + "</h3><p>" + data.body + "</p>";
        })
        .catch(function (error) {
            if (error.message.includes("Network")) {
                resultDiv.innerHTML = "<p style='color:red;'>Network error: please check your connection</p>";
            } else {
                resultDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
            }
        });
});

postForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.getElementById('postTitle').value;
    var body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, body: body })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            resultDiv.innerHTML = "<p style='color:green;'>Post created successfully!</p>" +
                "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            postForm.reset();
        })
        .catch(function (error) {
            if (error.message.includes("Network")) {
                resultDiv.innerHTML = "<p style='color:red;'>Network error: please check your connection</p>";
            } else {
                resultDiv.innerHTML = "<p style='color:red;'>" + error.message + "</p>";
            }
        });
});

putForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var id = document.getElementById('putId').value;
    var title = document.getElementById('putTitle').value;
    var body = document.getElementById('putBody').value;

    var xml = new XMLHttpRequest();
    xml.open('PUT', 'https://jsonplaceholder.typicode.com/posts/' + id);
    xml.setRequestHeader('Content-Type', 'application/json');

    xml.onload = function () {
        var data = JSON.parse(xml.responseText);
        resultDiv.innerHTML = "<p style='color:green;'>Post updated successfully!</p>" +
            "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        putForm.reset();
    };

    xhr.send(JSON.stringify({ title: title, body: body }));
});

deleteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var id = document.getElementById('deleteId').value;

    fetch('https://jsonplaceholder.typicode.com/posts/' + id, { method: 'DELETE' })
        .then(function (response) {
            if (response.ok) {
                
                // i know technically post cant be deleted from jsonplaceholder 
                resultDiv.innerHTML = "<p style='color:green;'>Successfully deleted</p>";
            } else {
                resultDiv.innerHTML = "<p style='color:red;'>Server error: " + response.status + "</p>";
            }
            deleteForm.reset();
        })
        .catch(function (error) {
            resultDiv.innerHTML = "<p style='color:red;'>Network error: please check your connection</p>";
        });
});


