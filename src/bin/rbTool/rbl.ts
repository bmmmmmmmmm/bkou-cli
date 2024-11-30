#!/usr/bin/env node

import { listRB } from "../../pkg/rbTool";

if (process.argv[2] === 'l') {
  const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
  listRB(date)
} else {
  listRB()
}
