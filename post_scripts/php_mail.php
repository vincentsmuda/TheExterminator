<?php

  // include our modules
  include('bitbucket_issues.php');

  // Allow cross origin requests
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');

  // Store the request for easier access
  $r = $_REQUEST;

  // Set the headers
  $headers = [
    'From: The Exterminator <exterminator@vincentsmuda.com>',
    'CC: ' . $r['cc']
  ];

  // If the screenshot is set
  if(!empty($r['screenshot'])) {

    // Create a clean version of the subject line
    $clean_subject = str_replace(' ','-',$r['subject']);
    $clean_subject = preg_replace('/[^A-Za-z0-9\-]/', '', $clean_subject);

    // Get the location that the script is executing
    $script = dirname($_SERVER['REQUEST_URI']);

    // Parse a genrated screenshot from user submission
    $file_name = 'screenshot.' . $clean_subject . '.' . strtotime('now') . '.png';
    $file_path = '';
    $image_data = str_replace('data:image/png;base64,', '', $r['screenshot']);
    $image_data = str_replace(' ', '+', $image_data);
    $image_decoded = base64_decode($image_data);
    $file = $file_path . $file_name;
    file_put_contents($file, $image_decoded);

    // Add screenshot link to body
    $r['body'] .= "\r\n\r\nScreenshot:\r\nhttp://{$_SERVER['SERVER_NAME']}{$script}/{$file_path}{$file_name}";

  }

  // Create the bitbucket issue
  if(!empty($r['bitbucket'])) {

    // Turn the json into array
    $bitbucket_info = json_decode($r['bitbucket'], true);

    // Spin up an issue
    $issue = new BitbucketIssue($bitbucket_info);

    // Add content to the issue
    $issue_return = $issue->addIssueTitle("{$r['action_taken']} | {$r['subject']}")
      ->addIssueContent($r['body'])
      ->sendIssue();

    // Attach an image to it if there is one
    if(!empty($r['screenshot']))
      $issue_attachment = $issue->attachImage($file);

  }

  // Send the email
  if(!empty($r['email']))
    $mailed = mail (
      $r['email'],
      $r['subject'],
      $r['body'],
      implode($headers, "\r\n")
    );

  // Set the status to false/true depending on sent email
  echo json_encode(['status' => $mailed, 'issue' => $issue_return]);

?>
