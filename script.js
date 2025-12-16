
var fetchBtn = document.getElementById('fetchBtn');
var fetchBtn2 = document.getElementById('fetchBtn2');
var resultDiv = document.getElementById('result');
var postForm = document.getElementById('postForm');
var putForm = document.getElementById('putForm');
var deleteForm = document.getElementById('deleteForm');


// 1
fetchBtn.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            resultDiv.innerHTML = "<h3>" + data.title + "</h3><p>" + data.body + "</p>";
        })
        .catch(function (error) {
            resultDiv.innerHTML = "<p style='color:red;'>Error: " + error + "</p>";
        });
});

// 2. 

fetchBtn2.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/2')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            resultDiv.innerHTML = "<h3>" + data.title + "</h3><p>" + data.body + "</p>";
        })
        .catch(function (error) {
            resultDiv.innerHTML = "<p style='color:red;'>Error: " + error + "</p>";
        });
});

// 3. 

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
            return response.json();
        })
        .then(function (data) {

            resultDiv.innerHTML = "<p style='color:green;'>Post created successfully!</p>" +
                "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            postForm.reset();
        })
        .catch(function (error) {
            resultDiv.innerHTML = "<p style='color:red;'>Error: " + error + "</p>";
        });
});

// 4. 

putForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var id = document.getElementById('putId').value;
    var title = document.getElementById('putTitle').value;
    var body = document.getElementById('putBody').value;


    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, body: body })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            resultDiv.innerHTML = "<p style='color:green;'>Post updated successfully!</p>" +
                "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            putForm.reset();
        })
        .catch(function (error) {
            resultDiv.innerHTML = "<p style='color:red;'>Error: " + error + "</p>";
        });
    });

    // delete bonus 

    var deleteForm = document.getElementById('deleteForm'); 

    deleteForm.addEventListener('submit', function (e) {
        e.preventDefault(); 

        var id = document.getElementById('deleteId').value; 

        
        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE'
        })
            .then(function (response) {
                if (response.ok) {
                    // showing a success message even though JSONPlaceholder doesnt actually deletes
                    resultDiv.innerHTML = "<p style='color:green;'>Post ID " + id + " deleted successfully!</p>";
                } else {
    
                    resultDiv.innerHTML = "<p style='color:red;'>Error: " + response.status + "</p>";
                }
                deleteForm.reset(); 
            })
            .catch(function (error) {
                resultDiv.innerHTML = "<p style='color:red;'>Error: " + error + "</p>";
            });
    });


