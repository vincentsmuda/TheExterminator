/**
 *  A helper class to check download speeds
 */

module.exports = class Bandwidth {

  /**
   *  Construct the class with arguments
   *  that override defaults
   */
  constructor (args) {

    // Set the defaults
    Object.assign(this, {
      'image': 'https://images.unsplash.com/reserve/E5CwLOxQSFimIXJurfpq_IMG_6424%20(1).jpg',
      'download_size': 2261022,
      'tests_to_run': 10,
      'test_offset': 1000,
      'autostart': false
    }, args);

    // Because there are 1024 b > kb > mb > gb
    this.per_k = 1024;

    // Set how accurate we need it to be
    this.decimal_places = 2;

    // Array to store the tests
    this.tests = [];

    // To store the results
    this.results = {};

    // Start the tests
    if(this.autostart) this.startTests();

  }

  /**
   *  Starts our tests with the givven paramaters
   */
  startTests () {

    // Wait for the window to load before
    // starting our tests
    window.addEventListener('load', () => {
      this.test();
    });

  }

  /**
   *  We get our test results from here
   */
  getResults () {
    return this.results;
  }

  /**
   *  Processes the results of all of the tests
   */
  processResults () {

    // Reset the aggregate results
    let duration = 0,
        speed_bps = 0,
        speed_kbps = 0,
        speed_mbps = 0,
        fastest_mbps = 1e20,
        slowest_mbps = 0,
        fastest_duration = 1e20,
        slowest_duration = 0,
        test_count = this.tests.length;

    // Add up all of the durations
    for (var i = 0; i < test_count; i++){

      // Add the duration
      duration += this.tests[i].duration;

      // Add the bits per second
      speed_bps += +this.tests[i].speed_bps;

      // Set up the fastest MBps
      if(this.tests[i].speed_mbps < fastest_mbps)
        fastest_mbps = this.tests[i].speed_mbps;

      // Set up the slowest MBps
      if(this.tests[i].speed_mbps > slowest_mbps)
        slowest_mbps = this.tests[i].speed_mbps;

      // Set up the fastest duration
      if(this.tests[i].duration < fastest_duration)
        fastest_duration = this.tests[i].duration;

      // Set up the slowest duration
      if(this.tests[i].duration > slowest_duration)
        slowest_duration = this.tests[i].duration;

    }

    // Store the aggregate results
    this.results = {
      duration: +(duration / test_count).toFixed(this.decimal_places),
      speed_bps: +(speed_bps / test_count).toFixed(this.decimal_places),
      speed_kbps: +(speed_bps / this.per_k / test_count).toFixed(this.decimal_places),
      speed_mbps: +(speed_bps / this.per_k / this.per_k / test_count).toFixed(this.decimal_places),
      fastest_mbps: +(+fastest_mbps).toFixed(this.decimal_places),
      slowest_mbps: +(+slowest_mbps).toFixed(this.decimal_places),
      fastest_duration: +fastest_duration.toFixed(this.decimal_places),
      slowest_duration: +slowest_duration.toFixed(this.decimal_places)
    }

    // Return the aggregate results
    return this.results;

  }

  /**
   *  Test download speed
   */
  test() {

    // Init our vars
    let startTime, endTime, cacheBuster,
        download = new Image();

    // Set a watcher that will watch for
    // the end of the image loading
    download.addEventListener('load', () => {

      // Sets the endtime
      endTime = (new Date()).getTime();

      // So something here
      let duration = (endTime - startTime) / 1000,
          bitsLoaded = this.download_size * 8,
          speed_bps = (bitsLoaded / duration).toFixed(this.decimal_places),
          speed_kbps = (speed_bps / this.per_k).toFixed(this.decimal_places),
          speed_mbps = (speed_kbps / this.per_k).toFixed(this.decimal_places);

      // Add the results to the tests
      this.tests.push({
        duration: duration,
        speed_bps: speed_bps,
        speed_kbps: speed_kbps,
        speed_mbps: speed_mbps
      });

      // Once we've reached the last test we will
      // process the results
      this.processResults();

      // If we haven't reached the tests to run
      // just go on and run another!
      if(this.tests.length < this.tests_to_run)
        this.test();

    });

    // Handle the error if one should occur
    download.addEventListener('error', (err, msg) => {
      console.log("Invalid image, or error downloading");
    });

    // Set the start time to measure against
    startTime = (new Date()).getTime();

    // Set the cache busting based on the start time
    cacheBuster = "?nnn=" + startTime;

    // Set the image src w/ cache busting
    download.src = this.image + cacheBuster;

  }
}
