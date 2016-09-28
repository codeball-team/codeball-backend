import { _ } from 'utils';

export const PITCH_MAX_CAPACITY = 22;
export const PITCH_MIN_CAPACITY = 2;

export const PITCH_TYPE_ARTIFICIAL_SOFT = 'ARTIFICIAL_SOFT';
export const PITCH_TYPE_FIRM_GROUND = 'FIRM_GROUND';
export const PITCH_TYPE_HARD_GROUND = 'HARD_GROUND';
export const PITCH_TYPE_INDOOR = 'INDOOR';
export const PITCH_TYPE_SOFT_GROUND = 'SOFT_GROUND';

export const PITCH_TYPE_STRING = {
  [PITCH_TYPE_ARTIFICIAL_SOFT]: 'Artificial soft (turf)',
  [PITCH_TYPE_FIRM_GROUND]: 'Firm ground',
  [PITCH_TYPE_HARD_GROUND]: 'Hard ground',
  [PITCH_TYPE_INDOOR]: 'Indoor',
  [PITCH_TYPE_SOFT_GROUND]: 'Soft ground'
};

export const PITCH_TYPE_OPTIONS = _(PITCH_TYPE_STRING).map((label, value) => ({
  label,
  value
}));
