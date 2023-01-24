import arg from "arg";

import figlet from "figlet";
import gradient from "gradient-string";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--verbose": Boolean,
      "-v": "--verbose",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    url: args._[0],
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
  if (!options.url.startsWith("http")) {
    options.url = "https://" + options.url;
  }
  console.log(gradient.morning("Pinging " + options.url + "..."));
  fetch(options.url)
    .then((response) => {
      if (options.verbose) {
        console.log(response);
      }
      if (response.ok) {
        figlet.text(
          "UP!",
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
          "DOWN!",
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
    })
    .catch((error) => {
      figlet.text(
        "ERROR!",
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
      if (options.verbose) {
        console.log(error);
      } else {
        console.log("Error cause: " + error.cause.code);
        console.log("For more information, use the --verbose flag.");
      }
    });
}
