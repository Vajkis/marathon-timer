# Marathon Timer with Streamlabs

## Description

The Marathon Timer is a versatile timer application designed for use during online streams, supporting various donation types and timer formats. It integrates with Streamlabs API to display live timer.

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/dist/v20.16.0/node-v20.16.0-x64.msi) installed on your system.

### Getting Started

1. **Download the Repository**

   - Visit the [Marathon Timer Release Page](https://github.com/Vajkis/marathon-timer/releases/latest).
   - Downloaded and extract zip file to your desired location.

2. **Install Dependencies**

   - Open a **Command Prompt** (CMD) with the extracted folder path.
   - To install all necessary packages, run: `npm i`

3. **Configure the Timer**

   - Open the `src/config.ts` file.
   - Customize the settings according to your preferences.

4. **Start the Application**

   - To start the timer application, run: `npm run dev`

5. **Accessing the Timer**

   - Once the application is running, you can manually add or remove time via a web browser at: [http://localhost:3000](http://localhost:3000).

6. **Timer Files Updates**

   - The timer will update the `data/timer.txt` file in real-time with the current timer value.
   - You can manually edit `data/rawTime.txt` or let the app update it automatically during the stream.

7. **Stopping the Timer**

   - To stop the timer, simply kill the console window running the application.

8. **Log Files for Debugging**

   - The application creates two log files for debugging purposes:

     - `data/timerUpdate.log` Logs all updates to the timer value. This file records every change made to the timer during the stream.
     - `data/donations.log` Logs the event objects related to donations. This file provides detailed information on the donation events, including type and amount.

   - You can check these log files to troubleshoot and monitor timer and donation activity during the stream.

### Supported Donation Types

```
YouTube Superchat
YouTube Member
YouTube Member Gift
Streamlabs Donate
Twitch Bits
Twitch Charity Donation
Twitch Subscription
```

### Supported Timer Types

```
English
Lithuanian
hh:mm:ss
```

## How It Works

The Marathon Timer interacts with the Streamlabs API to update the timer during marathon streams or events. Donations will update the timer in real-time, and you can manually add or remove time during the stream.

The timer value is stored and automatically updated in the `data/timer.txt` file. To display the current time, set up your streaming software (like Streamlabs Desktop) to read and display its contents in real-time. You can use the `Read from file` feature in the text source settings to achieve this.

### Features

- Real-time donation tracking via Streamlabs API.
- Multiple timer formats (English, Lithuanian, hh:mm:ss).
- Simple and intuitive user interface for managing timer and donation settings.
- Compatibility with popular streaming platforms (YouTube, Twitch).

## License

This project is licensed under the MIT License.

## Donations

If you find the Marathon Timer useful and would like to support its development, consider donating via [PayPal](https://www.paypal.com/paypalme/Vajkis/). Your contributions help me continue improving the projects and maintaining its features.

Thank you for your support!

## Contributing

Feel free to fork the project, make improvements, and submit pull requests! Contributions are welcome.

Happy hacking!
