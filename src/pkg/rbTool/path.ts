import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { _isAbsolutePath } from '../../utils';

const ENV_PATH = join(__dirname, 'rbTool', 'ENV');

const _getRBPathENV = () => {
  try {
    const rbPathENV = readFileSync(join(ENV_PATH, 'path'), 'utf8').trim();
    return rbPathENV
  } catch (err) {
    throw new Error(`>> Failed to get rbPath ENV <<\n${err}\nEND__: >> Failed to get rbPath ENV <<`);
  }
}

const _getRBPath = (init?: string) => {
  try {
    const rbPathENV = _getRBPathENV();
    if (init && init.length === 8) return join(rbPathENV, `${init}.md`);
    let offsetRB = Math.floor(Math.abs(Number(init))) || 0;
    let loop = 100;
    let curDate = new Date();
    let resPDate = '';
    do {
      loop--;
      const PDate = `${curDate.getFullYear()}${String(curDate.getMonth()+1).padStart(2, '0')}${String(curDate.getDate()).padStart(2, '0')}`;
      if (_checkRBDateSilent(PDate, rbPathENV)) {
        offsetRB--;
        resPDate = PDate;
      }
      curDate = new Date(curDate.getTime() - 1000 * 60 * 60 * 24);
    } while (offsetRB > 0 && loop > 0);
    if (loop === 0) throw new Error(`>> ERR path <<\nOver loop finding ${init} RB\nEND__: >> ERR path <<`);
    if (resPDate === '') throw new Error(`>> ERR path <<\nNo RB found\nEND__: >> ERR path <<`);
    const rbPathTD = join(rbPathENV, `${resPDate}.md`);
    return rbPathTD;
  } catch (err) {
    throw new Error(`>> Failed to get rbPath <<\n${err}\nEND__: >> Failed to get rbPath <<`);
  }
};

const _checkRBDateSilent = (rbDate: string, rbPathENV: string = _getRBPathENV()) => _checkRBPathSilent(join(rbPathENV, `${rbDate}.md`))

const _checkRBPathSilent = (rbPath: string) => rbPath.trim() && existsSync(rbPath)

const _checkRBPath = (rbPath: string) => {
  if (!rbPath.trim()) throw new Error('>> ERR path <<\nPath not set\nEND__: >> ERR path <<');
  if (!existsSync(rbPath)) throw new Error(`>> ERR path <<\nNo file for ${rbPath}\nEND__: >> ERR path <<`);
  // return true;
}

const _setRBPathENV = (newPath: string) => {
  try {
    if (!_isAbsolutePath(newPath)) throw new Error(`'${newPath}' is not absolute path`);
    mkdirSync(dirname(join(ENV_PATH, 'path')), { recursive: true });
    writeFileSync(join(ENV_PATH, 'path'), newPath);
  } catch (err) {
    throw new Error(`>> Failed to set rbPath ENV <<\n${err}\nEND__: >> Failed to set rbPath ENV <<`);
  }
};

export { _getRBPathENV, _getRBPath, _setRBPathENV, _checkRBPath }
