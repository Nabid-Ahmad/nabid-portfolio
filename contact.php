<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer
    if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        echo "<br><br><a href='index.html'>Go Back</a>";
        exit;
    }

    // --- Replace this with your actual email address ---
    $recipient = "your_email@example.com"; 

    // Set the email subject
    $email_subject = "New Contact from $name: $subject";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent successfully.";
        header("Location: index.html");
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
        echo "<br><br><a href='index.html'>Go Back</a>";
    }

} else {
    
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
    header("Location: index.html");
}
?>
