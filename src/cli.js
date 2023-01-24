import arg from "arg";

import figlet from "figlet";
import gradient from "gradient-string";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--url": String,
      "-u": "--url",
      "--verbose": Boolean,
      "-v": "--verbose",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    url: args["--url"] || null,
    verbose: args["--verbose"] || false,
  };
}

export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  //   console.log(options);
  if (options.url === null) {
    console.log("Please provide a url to ping");
    return;
  }
  pingUrl(options);
}

function pingUrl(options) {
  console.log(gradient.morning("Pinging " + options.url + "..."));

  fetch("https://" + options.url).then((response) => {
    if (options.verbose) {
      console.log(response);
    }
    if (response.ok) {
      figlet.text(
        "Success!",
        {
          font: "Doom",
        },
        function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          console.log(gradient.rainbow(data));
        }
      );
    } else {
      figlet.text(
        "Failed!",
        {
          font: "Doom",
        },
        function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          console.log(gradient.instagram(data));
        }
      );
    }
  });
}
