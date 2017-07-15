// Grab Platform.js for browser info
import Platform from 'platform';

// Grab the bandwidth tester
import Bandwidth from './Bandwidth';

// The Detector
module.exports = class Detective {

  // Construct the detector
  constructor () {

    // Set up the addblocked state
    this.ad_blocked = this.adBlock();

    // Set up the battery status
    this.battery_message = this.batteryStatus();

    // Set up the erros string
    // And set the max errors to store
    this.error = this.detect('errors', {count: 10}).message;

    // Set up the bandwidth tester
    this.bandwidth_tester = new Bandwidth({
      'tests_to_run': 5,
      'autostart': true
    });

  }

  /**
   *  Tells the Detective to detect
   */
  detect(fn, args = '') {

    // Return the detective's report report
    return {
      status: !!this[fn],
      message: !!this[fn]
        ? this[fn](args)
        : 'Looks like the detective can\'t detect ' + fn
    };

  }

  /**
	 *	Check to see if you support the current testing browser
	 */
	support (args) {

    // Check to see if we are in the clear
		if (
			Platform.name != 'IE' ||
			+ parseFloat(Platform.version) >= args.version
		) return true;

    // Let the user know that the browser is not supported
    alert(
			'The current browser is not supported by '
			+ this.project
		);

    // It's not supported
    return false;

	}

  /**
   *  Determine the user's bandwidth
   */
  bandwidth () {

    // Store the results for local use
    let results = this.bandwidth_tester.getResults(),
        mbs = results.speed_mbps || 0,
        output = !mbs ? `offline` : `${mbs} Mb/s`;

    // Now we add it to our return
    return output;

  }

  /**
	 *	Detects the user's Envirnoment
	 */
	envirnoment () {
		return Platform.description;
	}

	/**
	 *	Get the current page's URL
	 */
	URL () {
		return window.location.href;
	}

	/**
	 *	Detect's the user's current browser language
	 */
	locale () {
		return navigator.browserLanguage
			|| navigator.language
			|| navigator.languages[0];
	}

	/**
	 *	Detect the browser's current resolution
	 */
	resolution () {

		// Set up some basic vars
		let w = window,
		    d = document,
		    e = d.documentElement,
				s = typeof screen !== 'undefined' ? screen : false,
		    g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
    		y = w.innerHeight|| e.clientHeight|| g.clientHeight,
				sx = s ? s.width : 0,
				sy = s ? s.height : 0;

		// Return the resolution
		return `(${x} x ${y}) of (${sx} x ${sy})`;

	}

  /**
   *  Detects the pixel aspect ratio of the device
   */
  pixelAspectRatio () {
    if(!!window.devicePixelRatio) {
      let zoom = (window.devicePixelRatio*100).toFixed(2),
          zoom_word = window.devicePixelRatio < 1 ? 'out' : 'in' ;
      return `${window.devicePixelRatio} (Possibly zoomed ${zoom_word} at ${zoom}%)`
    }
    return 1;
  }

	/**
	 *	Detects how far down the user had scrolled
	 */
	scrollPosition () {

		// init the vars
		let doc = document.documentElement,
				x = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
				y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		// return the scroll positions
		return `${x} x ${y}`;

	}

  /**
   *  Detects browser plugins installed
   */
  browserPlugins () {

    // Store the plugins into a var
    let plugins = navigator.plugins,
        plugin_list = [],
        delimiter = "\n";

    // Loop through plugins
    for (var i = 0; i < plugins.length; i++)
      plugin_list.push(
        plugins[i].name + (
          plugins[i].description
          ? `: ${plugins[i].description}`
          : ''
        )
      );

    // return the list
    return plugin_list.join(delimiter);

  }

  /**
   *  Detects battery statuses
   */
  batteryStatus () {

    // If no battery API return that
    // we have no information
    if(!navigator.getBattery)
      return 'No battery info';

    // Make sure we have a interval
    if(!this.battery_interval) {
      this.battery_interval = setInterval(
        () => this.batteryStatus(),
        60000
      );
    }

    // Otherwise we return the info
    navigator.getBattery().then((battery) => {

      // Start our message
      let message = '',
          charging = battery.charging,
          charge_time_state = charging ? 'chargingTime' : 'dischargingTime',
          charge_time = battery[charge_time_state];

      // is charging
      message += 'Is'
        + (charging ? '' : ' not' )
        + ' charging';

      // What's the battery level?
      message += "\n"
        + 'Is at '
        + (battery.level * 100)
        + '%' ;

      // How long until charged or dead?
      message += "\n"
        + (charge_time/60/60).toFixed(2)
        + ' hours left until battery is '
        + (charging ? 'charged' : 'dead')
        + '.' ;

      // Set the battery message in the obj
      this.battery_message = message;

    });

    // return the battery message
    return this.battery_message;

  }

	/**
	 *	Detects if adblock is enabled
	 */
	adBlock () {

		// if we already detected the adblock, return it
		if(this.ad_blocked) return this.ad_blocked;

		// Create our bait
		let bait = document.createElement('div');

		// give it some innards
		bait.innerHTML = '&nbsp;';

		// give it a baity classname
		bait.className = 'adsbox';

    // Fires the rest of the setup once the window loads
    if(document.body)
      window.addEventListener('load', () => {
        if(this.loadAdblockBait)
          this.loadAdblockBait(bait);
      });
    else
      if(this.loadAdblockBait)
        this.loadAdblockBait(bait);

    // Set it to disabled
		return 'Disabled';

	}

	/**
	 *	Detects wheather a browser's cookies are enabled
	 */
	cookiesEnabled () {

		// Do the detecting
		let d = document,
				enabled = ("cookie" in d && (d.cookie.length > 0 || (d.cookie = "test").indexOf.call(d.cookie, "test") > -1));

		// return a string
		return enabled ? 'Enabled' : 'Disabled or legacy browser' ;

	}

  /**
   *  Loads the adblock's bait
   */
  loadAdblockBait (bait) {

    // Add it to the end of the body
		document.body.appendChild(bait);

		// Check to see if it was removed
		setTimeout(() => {

			// check to see if it has height
			if(!bait.offsetHeight) this.ad_blocked = 'Enabled';

			// remove the bait
			bait.remove();

		}, 100);

  }

  /**
   *  Detects all errors sent through the window (only after script has initd)
   */
  errors (args) {

    // If we've already initd the errors listener
    if(this.error)
      return this.error.log.length
        ? this.error.log.join("\r\n")
        : 'No errors logged (After script init)';

    // Set up the window error listener
    window.addEventListener('error' , win_error => {

      // Do nothing if we've exceeded our error count
      if(this.error.count <= 0)
        return console.log(this.errors());

      // Add the error
      this.error.log.push([
        win_error.message,
        'Line: ' + win_error.lineno,
        'Column: ' + win_error.colno,
      ].join(' | '));

      // Decrement errors
      this.error.count--;

    });

    // Use this to test error logging
    // setInterval(() => somethang(),4000);

    // Return the array to push our errors
    return {
      count: args.count,
      log: []
    };

  }

}
