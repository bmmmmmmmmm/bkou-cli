#!/usr/bin/env node

import { listRB } from "../../pkg/rbTool";

const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
listRB(date)
