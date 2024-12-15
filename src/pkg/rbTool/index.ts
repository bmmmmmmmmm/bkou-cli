import { _log } from '../../utils';
import { _getRBPathENV, _getRBPath, _setRBPathENV, _checkRBPath } from "./path";
import { _addRB } from "./add";
import { _listRB } from "./list";

const addRB = (content: string) => {
  try {
    const filePath = _getRBPath()
    _addRB(filePath, content)
    _log(`RB added => ${content}`)
  } catch (err) {
    _log(err, 'red')
  }
}
const listRB = (initRBPath?: string) => {
  try {
    const filePath = _getRBPath(initRBPath)
    _checkRBPath(filePath)
    const { result, lineCount, wordCount } = _listRB(filePath)
    _log([...result.map(([time, row]) => `${time} => ${row}`), '================', `Total lines: ${lineCount}`, `Total words: ${wordCount}`])
  } catch (err) {
    _log(err, 'red')
  }
}

const setRBPathENV = (path: string) => {
  try {
    _setRBPathENV(path)
    _log(`Path set to ${path}`)
  } catch (err) {
    _log(err, 'red')
  }
}

const getRBPathENV = () => {
  try {
    const path = _getRBPathENV()
    _log(path)
  } catch (err) {
    _log(err, 'red')
  }
}

export {
  setRBPathENV,
  getRBPathENV,

  addRB,
  listRB
}
