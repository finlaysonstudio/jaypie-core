import { vi } from "vitest";

const MOCK = {
  //
};

function mockLogFactory() {
  // Create skeleton of mock objects, as much as possible
  const mock = {
    debug: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
    info: vi.fn(),
    trace: vi.fn(),
    var: vi.fn(),
    warn: vi.fn(),
    with: vi.fn(),
  };
  // Fill out nested mocks
  mock.debug.var = mock.var;
  mock.error.var = mock.var;
  mock.fatal.var = mock.var;
  mock.info.var = mock.var;
  mock.trace.var = mock.var;
  mock.warn.var = mock.var;
  // Have modules return correct objects
  mock.with.mockReturnValue(mock);

  // Create something in the shape of the module
  const module = {
    debug: mock.debug,
    error: mock.error,
    fatal: mock.fatal,
    info: mock.info,
    trace: mock.trace,
    var: mock.var,
    warn: mock.warn,
    with: mock.with,
  };

  // Pin mocks to the module
  module.mock = mock;
  module.MOCK = MOCK;

  // return the module
  return module;
}

export default mockLogFactory();

const originalPointers = {};
export function spyLog(log) {
  const mockLog = mockLogFactory();
  originalPointers.debug = log.debug;
  originalPointers.error = log.error;
  originalPointers.fatal = log.fatal;
  originalPointers.info = log.info;
  originalPointers.trace = log.trace;
  originalPointers.var = log.var;
  originalPointers.warn = log.warn;
  originalPointers.with = log.with;
  /* eslint-disable no-param-reassign */
  log.debug = mockLog.debug;
  log.error = mockLog.error;
  log.fatal = mockLog.fatal;
  log.info = mockLog.info;
  log.trace = mockLog.trace;
  log.var = mockLog.var;
  log.warn = mockLog.warn;
  log.with = mockLog.with;
  log.mock = mockLog.mock;
  log.MOCK = mockLog.MOCK;
  /* eslint-enable no-param-reassign */
}
export function restoreLog(log) {
  /* eslint-disable no-param-reassign */
  log.debug = originalPointers.debug;
  log.error = originalPointers.error;
  log.fatal = originalPointers.fatal;
  log.info = originalPointers.info;
  log.trace = originalPointers.trace;
  log.var = originalPointers.var;
  log.warn = originalPointers.warn;
  log.with = originalPointers.with;
  delete log.mock;
  delete log.MOCK;
  /* eslint-enable no-param-reassign */
}
