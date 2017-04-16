// Grab Platform.js for browser info
import Platform from 'platform';

// The Detector
module.exports = class Detective {

  // Construct the detector
  constructor () {

    // Set up the addblocked state
    this.ad_blocked = this.adBlock();

    // Set up the erros string
    // And set the max errors to store
    this.error = this.detect('errors', {count: 10}).message;

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

		// Add it to the end of the body
		document.body.appendChild(bait);

		// Check to see if it was removed
		setTimeout(() => {

			// check to see if it has height
			if(!bait.offsetHeight) this.ad_blocked = 'Enabled';

			// remove the bait
			bait.remove();

		}, 100);

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
