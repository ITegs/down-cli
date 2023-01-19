import arg from "arg";

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
  console.log(options);
  if (options.url === null) {
    console.log("Please provide a url to ping");
    return;
  }
  pingUrl(options);
}

// ping the url given in the options
function pingUrl(options) {
  console.log("Pinging url", options.url);

  fetch("https://" + options.url).then((response) => {
    if (options.verbose) {
      console.log(response);
    }
    if (response.ok) {
      console.log("Success!");
    } else {
      console.log("Error pinging url");
    }
  });
}
