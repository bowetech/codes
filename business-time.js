


// const openStatus = (open, close) => {
// 	document.getElementById("business-status").innerHTML = "Open Now";

// 	console.log(open)
// }


/* Returns  Array: {Opening and Closing  hours} 
				 or False if no entries are found
				 */
function getTodayStatus(business_hours) {
	let date = new Date();
	let currentDay = date.getDay();
	let value = false;

	business_hours.map((workTime) => {
		const {
			weekday_id,
			open_time,
			close_time
		} = workTime;
		// Check if today is listed 
		if (weekday_id == currentDay) {
			// check if the buiness hours is set to null
			if (open_time == null) return value;

			return value = {
				today: weekday_id,
				openingTime: open_time,
				closingTime: close_time
			};
		}
	});
	return value;
}



function hmsToSeconds(s) {
	var b = s.split(':');
	return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
}


// Convert seconds to hh:mm:ss
// Allow for -ve time values
function secondsToHMS(secs) {
	function z(n) {
		return (n < 10 ? '0' : '') + n;
	}
	var sign = secs < 0 ? '-' : '';
	secs = Math.abs(secs);
	return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + z(secs % 60);
}


function timeRemaning(openTime, closeTime) {
	let status = false

	let now = new Date().toLocaleTimeString('fr', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	// if open time is false or null  return  false				
	if (openTime == null) return status = false

	if (now > closeTime) {
		// Business is closed - present time is pass close time
		let timeLeft = secondsToHMS(hmsToSeconds(now) - hmsToSeconds(closeTime))
		let timeToString = timeLeft.split(':')

		//return (Number(timeToString[0]) + 'hrs ' + Number(timeToString[1]) + 'mins')

	} else {
		// Business is open
		let timeLeft = secondsToHMS(hmsToSeconds(closeTime) - hmsToSeconds(now));
		let timeToString = timeLeft.split(':');

		return (Number(timeToString[0]) + 'hrs ' + Number(timeToString[1]) + 'mins');
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
HTML / BLADE  CALLS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

<script type="text/javascript">
				let now = new Date().toLocaleTimeString('fr', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				});

				var business_hours = @json($listing['hours']);
				let n = getTodayStatus(business_hours)
				let t = timeRemaning(n.openingTime, n.closingTime)

				if (t !== false) {
					document.getElementById("open-status").innerHTML = "Business Closes in";
					document.getElementById("remaing-time").innerHTML = t;
				}

				if (n === false || n.closingTime < now) {
					///document.getElementById('day' + n.today).classList.add('bg-red-300', 'text-white', 'border-red-400');
					document.getElementById("remaing-time").innerHTML = "X"
					document.getElementById("open-status").innerHTML = "Business is Closed"

				} else if (n.openingTime > now) {
					document.getElementById("business-status").classList.remove('bg-red-400');
					document.getElementById("business-status").classList.add('bg-orange-400');
					document.getElementById("business-status").innerHTML = "Opening Soon";
					document.getElementById('day' + n.today).classList.add('bg-orange-300', 'text-white', 'border-orange-400');
				} else {
					document.getElementById('day' + n.today).classList.add('bg-teal-300', 'text-white', 'border-teal-400');
					document.getElementById("business-status").classList.remove('bg-red-400');
					document.getElementById("business-status").classList.add('bg-teal-400');
					document.getElementById("business-status").innerHTML = "Open Now";
				}
				</script>
