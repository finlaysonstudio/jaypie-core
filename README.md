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

TODO: Example should include one trivial and possibly one thorough example of using the library

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
} from "@jaypie/core"
```

#### log

```javascript
import { log } from "@jaypie/core"

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
import { log } from "@jaypie/core"

log.var("message", "Hello, world");
log.var({ message: "Hello, world" });

const message = "Hello, world";
log.var({ message });
```

##### log.with() - clone

Create a new log object with additional tags

```javascript
import { log } from "@jaypie/core"

const libLogger = log.with({ lib: "myLib" });
```

#### Logger \<Class>

```javascript
import { LOG, Logger } from "@jaypie/core"

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
import { moduleLogger } from "@jaypie/core"

moduleLogger.trace();
```

#### silent

Useful to support logging in code but only if an instantiated log object is passed in.

```javascript
import { silent } from "@jaypie/core"

silent.fatal(); // Doesn't log

function myHello(log=silent) {
  log.debug("Hello"); // Will not log if no log is passed
}
```

## 🛣 Roadmap

* 0.3.0 - `expressHandler`
* ? - Complete documentation
* 1.0.0 - Allow bug fixes, stable release

## 📝 Changelog

| Date       | Version | Summary        |
| ---------- | ------- | -------------- |
|  3/10/2024 |   0.2.0 | Export `lambdaHandler` |
|   3/5/2024 |   0.1.0 | Export all the core helpers |
|   3/5/2024 |   0.0.1 | Initial commit |

## 📜 License

Published by Finlayson Studio. All rights reserved
