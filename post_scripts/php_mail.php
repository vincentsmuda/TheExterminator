<?php

// Allow cross origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

  // Store the request for easier access
  $r = $_REQUEST;

  // Set the headers
  $headers = [
    'From: The Exterminator <info@someagency.com>',
    'CC: ' . $r['cc']
  ];

  // If the screenshot is set
  if(!empty($r['screenshot']))
    $r['subject'] .= "\r\n\r\n{$r['screenshot']}";

  // Send the email
  $mailed = mail (
    $r['email'],
    $r['subject'],
    $r['body'],
    implode($headers, "\r\n")
  );

  // Set the status to false/true depending on sent email
  echo json_encode(['status' => $mailed]);

?>
