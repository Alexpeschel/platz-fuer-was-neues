<?php


$EmailTo = "alexanderpeschel@me.com";
$Name = Trim(stripslashes($_POST['Name']));
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message']));
$EmailFrom = $Email;
$Subject = $Name . " hat eine Nachricht geschickt";

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>" . "\n" . 'Content-Type:text/plain; charset="UTF-8"');

// redirect to success page
if ($success){
  echo "Deine Nachricht wurde versendet!"; // success message
}
?>
