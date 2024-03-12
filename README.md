# Jaypie Core 🐦‍⬛🥧

Utility package with constants, errors, functions and logging

## 🐦‍⬛ Introduction

Jaypie is an opinionated approach to application development centered around JavaScript and the JSON:API specification in an event-driven architecture

Beyond that Jaypie core tries to stay neutral. Jaypie libraries such as `@jaypie/express` build off of this core into specific ecosystems

In an ideal world the bird would be looking at the pie

## 📋 Usage

### Installation

```bash
npm install @jaypie/core
```

### Example

#### Simple Example Using Lambda

`event` is passed to the handler when the event is triggered.
It will include details about the event (e.g., type, parameters).

```javascript
import { lambdaHandler, log } from "@jaypie/core";

export default lambdaHandler(
  // Handler function
  async (event) => {
    log.trace("\"Happy path\" events belong in trace");

    // "Your Code Here"

    return "Hello, world!";
  },
  // Configuration (optional)
  {
    name: "helloWorld",
  },
);
```

Throw jaypie errors below to convey semantic meaning. Thrown errors will be caught and logged. Non-jaypie errors will be treated as unhandled exceptions. Log your own errors with `log.error`.

```javascript
import { log, NotFoundError } from "@jaypie/core";

log.error("Could not find resource");
throw NotFoundError();
```

##### Simple Logging

```javascript
log.trace("\"Happy path\" events belong in trace");

// Important variables for debugging can be logged as "var"s
log.var("message", "Hello, world");
log.var({ message: "Hello, world" });
log.var({ message });

if(event.strangeCondition) {
  log.debug("Slight deviation from the happy path");
  // ...Helpful for someone debugging a real problem later
}

if(event.problemCondition) {
  log.warn("Someone should look into this");
  // ...It can at least be tracked to know how often it happens
}

if(event.errorCondition) {
  log.error("Something is not right!");
  // ...It might even be broken
}
```

`log` functions should be used in your logic. Following the "trace-only happy path" will simplify debugging and log management.

`log.info` exists for things that should be tracked external to debugging (e.g., transaction successes). By default the `event` and the `response` from the handler will be logged as info. This should be the least-used log level by code references _(we hope error and warn are unused in runtime)_

#### Complex Example Using Express

```javascript
import { expressHandler, log } from "@jaypie/core";

export default expressHandler(
  // Handler function
  async ({ req }) => {
    log.trace("\"Happy path\" events belong in trace");

    // "Your Code Here"

    return json;
  },
  // Configuration (optional)
  {
    name: "expressApi",
    validate: [], // Array of validation functions
    setup: [], // Array of setup functions
    local: [], // Array of local values and getters
    teardown: [], // Array of teardown functions
  },
);
```

The function:

* Only receives `req` and it must be destructured
* Should return a JSON object, ideally JSON:API-compliant 🤩
* May return a scalar which will be treated as text/html
* Should throw a `jaypie` error if there is a problem

TODO: This example needs specifics on `validate`, `setup`, `local`, and `teardown`

## 📖 Reference

### Constants

TODO: Complete list of constants in the package

### Errors

TODO: Complete list of errors in the package

### Functions

TODO: Complete list of utility functions in the package

### Handlers

TODO: Complete list of utility functions in the package

### Logging

```javascript
import { 
  log,
  LOG, // LOG.FORMAT, LOG.LEVEL
  Logger,
  moduleLogger,
  silent,
} from "@jaypie/core";
```

#### log

```javascript
import { log } from "@jaypie/core";

log.trace();
log.debug();
log.info();
log.warn();
log.error();
log.fatal();
```

##### log.var(key, value) or log.var({ key: value })

Log a key-value pair. In the `json` format, the key will be tagged as `var` and the value will be the value. Logging marker variables this way can be useful for debugging.

```javascript
import { log } from "@jaypie/core";

log.var("message", "Hello, world");
log.var({ message: "Hello, world" });

const message = "Hello, world";
log.var({ message });
```

##### log.with() - clone

Create a new log object with additional tags

```javascript
import { log } from "@jaypie/core";

const libLogger = log.with({ lib: "myLib" });
```

#### Logger \<Class>

```javascript
import { LOG, Logger } from "@jaypie/core";

const log = new Logger({
  format: LOG.FORMAT.JSON, // default="color"; also "json", "text"
  level: LOG.LEVEL.TRACE, // default=debug
  tags: {}, // default={}, will be included on every log
  varLevel, // default="debug"
});
```

#### moduleLogger

Uses `silent` by default.  if `process.env.MODULE_LOG_LEVEL` is `true`, follows `process.env.LOG_LEVEL`.  If `process.env.MODULE_LOG_LEVEL` is also set, uses that log level.

```javascript
import { moduleLogger } from "@jaypie/core";

moduleLogger.trace();
```

#### silent

Useful to support logging in code but only if an instantiated log object is passed in. This way the caller only gets logging if they want it. Module logger will use `silent` if `process.env.MODULE_LOG_LEVEL` is not set.

```javascript
import { silent } from "@jaypie/core";

silent.fatal(); // Doesn't log

function myHello(log=silent) {
  log.debug("Hello"); // Will not log if no log is passed
}
```

## 🛣 Roadmap

* ? - Complete documentation
* 1.0.0 - Allow bug fixes, stable release

## 📝 Changelog

| Date       | Version | Summary        |
| ---------- | ------- | -------------- |
|  3/11/2024 |   0.3.0 | Export `expressHandler` |
|  3/10/2024 |   0.2.0 | Export `lambdaHandler` |
|   3/5/2024 |   0.1.0 | Export all the core helpers |
|   3/5/2024 |   0.0.1 | Initial commit |

## 📜 License

Published by Finlayson Studio. All rights reserved
