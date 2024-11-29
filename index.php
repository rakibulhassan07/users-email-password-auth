<?php

// Set CORS headers if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *"); // get ,post,delete
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$connection = new mysqli('localhost', 'root', '', 'user_Details');

// Check the connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// http://localhost/phpt/index.php/api/users


// Get the request method and URL path
$requestMethod = $_SERVER['REQUEST_METHOD'];

$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/')); // Split the URL path into segments

// Assuming the base path is "/api", so the second segment should be either "users" or "users"
$entity = $requestUri[3] ?? null; // This will either be 'users' or 'users'



// Handle the request based on the entity and method
if ($entity === 'users') {
    if ($requestMethod === 'GET') {
        // Fetch users (GET /api/users)
        $sql = "SELECT * FROM users";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = [
                    "id" => $row['id'], 
                    "email" => $row['email'],
                    "username" => $row['username'],
                    "password" => $row['password'],
                ];
            }
            echo json_encode($users);
        } else {
            echo json_encode([]);
        }
    }
     elseif ($requestMethod === 'POST') {
        // Add a new hotel (POST /api/users)
        $data = json_decode(file_get_contents('php://input'), true); // Get JSON data from the client

        if (isset( $data['email'],$data['username'], $data['password'])) {
            // Sanitize inputs
            $email = $connection->real_escape_string($data['email']);
            $username = $connection->real_escape_string($data['username']);
            $password = $connection->real_escape_string($data['password']);
            
            // Insert into the database
            $sql = "INSERT INTO users ( email,username, password ) 
                VALUES ( '$email','$username', '$password')";

            if ($connection->query($sql) === TRUE) {
                echo json_encode(["message" => "User added successfully!"]);
            } else {
                echo json_encode(["error" => "Error: " . $sql . "<br>" . $connection->error]);
            }
        } else {
            echo json_encode(["error" => "Invalid input: Please provide all required fields."]);
        }
    }
}


else {
    // If the entity is not recognized (e.g., /api/somethingElse)
    header("HTTP/1.1 404 Not Found");
    echo json_encode(["error" => "Invalid endpoint"]);
}

?>