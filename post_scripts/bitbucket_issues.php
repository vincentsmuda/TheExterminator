<?php

/**
 *  The class that handles creating bitbucket issues
 */

class BitbucketIssue {

  // ready the username
  private $user = null;

  // Ready the app password
  private $app_password = null;

  // the repository user
  private $repository_user = null;

  // The repository slug
  private $repository = null;

  // Stores the sent issue id
  private $issue_id = null;

  // Set up the base url
  private $base_url = 'https://api.bitbucket.org';

  // set up our endpoint path
  private $issues_path = '/2.0/repositories/%s/issues';

  // get our endpoint var ready
  private $endpoints = [];

  // set the issue arguments
  private $issue_args = ['title' => 'Untitled Issue'];

  /**
   * Builds our class
   * @return null
   */
  function __construct ($args) {

    // Store the username
    $this->user = $args['user'];

    // Ready the app password
    $this->app_password = $args['app_password'];

    // the repository user
    $this->repository_user = $args['repository_user'];

    // The repository slug
    $this->repository = $args['repository'];

    // Set the path
    $base_path = $this->base_url . sprintf(
      $this->issues_path,
      "{$this->repository_user}/{$this->repository}"
    );

    // sets the endpoint
    $this->endpoints = [
      'issue' => $base_path,
      'attachment' => $base_path . '/%s/attachments'
    ];

  }

  /**
   * Creates an issue on bitbucket
   * @return JSON       the curl json response
   */
  public function sendIssue () {

    // Build the issue
    $this->buildIssue();

    // Send our request
    $result = $this->sendRequest([
      'endpoint' => $this->endpoints['issue'],
      'query' => $this->issue_args['query'],
      'headers' => [
        'Content-Type: application/json',
        'Content-Length: ' . $this->issue_args['length']
      ]
    ]);

    // get the json response
    $json_result = json_decode($result);

    // Store the issue ID
    $this->issue_id = $json_result->id;

    // return the result
    return $result;

  }

  /**
   * Adds stuff via a curl request
   * @return string the result
   */
  public function sendRequest ($opts) {

    //open connection
    $ch = curl_init();

    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL, $opts['endpoint']);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch,CURLOPT_POSTFIELDS, $opts['query']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, "{$this->user}:{$this->app_password}");
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $opts['headers']);

    //execute post
    $result = curl_exec($ch);

    //close connection
    curl_close($ch);

    // return the curl result
    return $result;

  }

  /**
   * Builds our issue's arguments
   * @return Object       self
   */
  public function buildIssue () {

    // Issue params
    $this->issue_args['query'] = json_encode($this->issue_args['args']);
    $this->issue_args['length'] = strlen($this->issue_args['query']);

    // return self
    return $this;

  }

  /**
   * Adds the title to the issue
   * @param string $title the title of the issue
   */
  public function addIssueTitle ($title) {

    // Store the title
    $this->issue_args['args']['title'] = $title;

    // return self
    return $this;

  }

  /**
   * Adds content to the Issue
   * @param string $title The issue content
   */
  public function addIssueContent ($content) {

    // Store the title
    $this->issue_args['args']['content'] = [
      'html' => $content,
      'raw' => $content,
      'markup' => 'markdown'
    ];

    // return self
    return $this;

  }

  /**
   * Attach an image to the issue
   * @param  string $image_data the image data
   * @return Bool             successfully attached?
   */
  public function attachImage ($file_ref, $id = 0) {

    // jump out if invalid image
    if(empty($file_ref)) return false;

    // Send our request
    $result = $this->sendRequest([
      'endpoint' => sprintf(
        $this->endpoints['attachment'],
        empty($id) ? $this->issue_id : $id
      ),
      'query' => [
        'file' => '@' . realpath($file_ref)
      ],
      'headers' => [
        'Content-Type: multipart/form-data'
      ]
    ]);

    // return the result
    return $result;

  }

}

?>
