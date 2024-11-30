import { _log } from '../../utils';
import { _getRbPathENV, _getRbPath, _setRbPathENV } from "./path";
import { _addRB } from "./add";
import { _listRB } from "./list";

const addRB = (content) => {
  try {
    const filePath = _getRbPath()
    _addRB(filePath, content)
    _log(`RB added => ${content}`)
  } catch (err) {
    _log(err, 'red')
  }
}
const listRB = (initDate?) => {
  try {
    const filePath = _getRbPath(initDate)
    const { result, lineCount, wordCount } = _listRB(filePath)
    _log([...result.map(([time, row]) => `${time} => ${row}`), '================', `Total lines: ${lineCount}`, `Total words: ${wordCount}`])
  } catch (err) {
    _log(err, 'red')
  }
}
const setRbPathENV = (path) => {
  try {
    _setRbPathENV(path)
    _log(`Path set to ${path}`)
  } catch (err) {
    _log(err, 'red')
  }
}

const getRbPathENV = () => {
  try {
    const path = _getRbPathENV()
    _log(path)
  } catch (err) {
    _log(err, 'red')
  }
}

export {
  setRbPathENV,
  getRbPathENV,

  addRB,
  listRB
}
