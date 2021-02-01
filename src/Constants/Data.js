/**
 * Static data to be used across app
 */

import {CALC_TYPE_NUM, CALC_TYPE_OPR} from '@constants/Constants';

// Calculator Details
export const KEYPAD_KEYS = [
  {
    text: '9',
    value: 9,
    type: CALC_TYPE_NUM,
  },
  {
    text: '8',
    value: 8,
    type: CALC_TYPE_NUM,
  },
  {
    text: '7',
    value: 7,
    type: CALC_TYPE_NUM,
  },
  {
    text: '6',
    value: 6,
    type: CALC_TYPE_NUM,
  },
  {
    text: '5',
    value: 5,
    type: CALC_TYPE_NUM,
  },
  {
    text: '4',
    value: 4,
    type: CALC_TYPE_NUM,
  },
  {
    text: '3',
    value: 3,
    type: CALC_TYPE_NUM,
  },
  {
    text: '2',
    value: 2,
    type: CALC_TYPE_NUM,
  },
  {
    text: '1',
    value: 1,
    type: CALC_TYPE_NUM,
  },
  {
    text: '.',
    value: '.',
    type: CALC_TYPE_NUM,
    icon: ['fas', 'circle'],
  },
  {
    text: '0',
    value: 0,
    type: CALC_TYPE_NUM,
  },
  {
    text: 'Back',
    value: 'BACK',
    type: CALC_TYPE_OPR,
    icon: ['fas', 'backspace'],
  },
];
export const KEYPAD_ACTIONS = [
  {
    text: 'C',
    value: 'CLEAR',
    type: CALC_TYPE_OPR,
    icon: ['far', 'times-circle'],
  },
  {
    text: '+',
    value: 'ADD',
    type: CALC_TYPE_OPR,
    icon: ['fas', 'plus'],
  },
  {
    text: '-',
    value: 'SUBSTRACT',
    type: CALC_TYPE_OPR,
    icon: ['fas', 'minus'],
  },
  {
    text: 'x',
    value: 'MULTIPLY',
    type: CALC_TYPE_OPR,
    icon: ['fas', 'times'],
  },
  {
    text: '/',
    value: 'DIVIDE',
    type: CALC_TYPE_OPR,
    icon: ['fas', 'divide'],
  },
];
