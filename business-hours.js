<script type="text/javascript">
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

					let now = new Date().toLocaleTimeString('fr', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					});

					let status = false

					// if open time is false or null
					// return  false
					if (openTime == null) return status = false

					if (now > closeTime) {

						// if current time is more than close time 
						// set status as  "Opens in"

						// then check if the following day is not set to null
						//then compare the time with the current time ... 
						//continue checking untill it finds a date and enter the name eg "Monday" 
						// or if time difffence is less than 4 hours ... then show the hours differencet  

						let timeDiffrence = false
						status = "Opens in"



						let timeLeft = secondsToHMS(hmsToSeconds(now) - hmsToSeconds(closeTime))

						let timeToString = timeLeft.split(':')

						console.log(timeToString[0])



					} else

					{
						// ELse  return the time left before closing time 
						// set Status to "Closing in"
						status = "Closing in"




						let timeLeft = secondsToHMS(hmsToSeconds(closeTime) - hmsToSeconds(now))

						let timeToString = timeLeft.split(':')


						document.getElementById("open-status").innerHTML = "Business Closes in"
						document.getElementById("remaing-time").innerHTML = (Number(timeToString[0]) + 'hrs ' + Number(timeToString[
							1]) + 'mins')

					}

				}




				let now = new Date().toLocaleTimeString('fr', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				});




				var business_hours = @json($listing['hours']);

				let n = getTodayStatus(business_hours)

				let t = timeRemaning(n.openingTime, n.closingTime)

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
