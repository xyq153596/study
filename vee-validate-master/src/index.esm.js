import install from './install';
import directive from './directive';
import mixin from './mixin';
import en from '../locale/en';
import use from './use';
import Rules from './rules';
import mapFields from './core/mapFields';
import Validator from './core/validator';
import ErrorBag from './core/errorBag';
import { ErrorComponent } from './components';

const version = '__VERSION__';

const rulesPlugin = ({ Validator }) => {
  Object.keys(Rules).forEach(rule => {
    Validator.extend(rule, Rules[rule]);
  });

  // Merge the english messages.
  Validator.localize('en', en);
};

use(rulesPlugin);

export {
  install,
  use,
  directive,
  mixin,
  mapFields,
  Validator,
  ErrorBag,
  Rules,
  ErrorComponent,
  version
};

export default {
  install,
  use,
  directive,
  mixin,
  mapFields,
  Validator,
  ErrorBag,
  ErrorComponent,
  Rules,
  version
};
