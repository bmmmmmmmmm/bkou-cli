#!/usr/bin/env node

import { _log } from '../utils'
import {
  setRBPathENV,
  getRBPathENV,
  addRB,
  listRB,

  countWords
} from '../pkg/index.cli'

export const commands = {
  '@@SETRBPATH@@': setRBPathENV,
  '@@GETRBPATH@@': getRBPathENV,

  'rb': addRB,
  'rbl': () => listRB(),
  'le': countWords
} as const
type Commands = keyof typeof commands
const commandsDesc: Partial<Record<Commands, string>> = {
  rb: '',
  rbl: '',
  le: ''
}

const main = async () => {
  const whichCommand = process.argv[2] as Commands
  const USER_INPUT = process.argv.slice(3).join(' ') || '';
  try {
    if (!whichCommand) {
      return _log(['commandList:', JSON.stringify(commandsDesc, null, 2)], 'cyan')
    }
    if (!commands[whichCommand]) {
      throw new Error(`Unknown command: ${whichCommand}`)
    }
    await commands[whichCommand](USER_INPUT)
  } catch (err) {
    _log([err, '================', 'commandList:', JSON.stringify(commandsDesc, null, 2)], 'red')
  }
}

main()
