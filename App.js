import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import numeral from 'numeral';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

import Keypad from '@components/Keypad';
import ViewContainer from '@components/ViewContainer';
import SafeAreaWrapper from '@components/SafeAreaWrapper';

import {MIRAGE, FADE_TEXT_GREY, GRAY_GAINSBORO} from '@constants/Colors';
import {CALC_TYPE_NUM, CALC_TYPE_OPR} from '@constants/Constants';
import {roundTo} from '@utilities/Utility';

library.add(far, fas);

const screenHeight = Dimensions.get('window').height;
const resultFontSize = (screenHeight * 4) / 100;
const equationFontSize = (screenHeight * 2.5) / 100;
const maxInputNumber = 999999999999999;
const validNumRegex = /^-?\d*\.?\d{0,12}$/;
const DECIMAL_ROUND_VALUE = 8;
const numeralFormat = '0,0.[00000000]';

const App = ({navigation}) => {
  const [leftRaw, setLeftRaw] = useState(null);
  const [leftText, setLeftText] = useState('');
  const [rightRaw, setRightRaw] = useState(null);
  const [rightText, setRightText] = useState('');
  const [operatorText, setOperatorText] = useState('');
  const [operatorRaw, setOperatorRaw] = useState(null);
  const [resultRaw, setResultRaw] = useState(null);
  const [resultText, setResultText] = useState('');
  const [equationText, setEquationText] = useState('');

  useEffect(() => {
    let tempEqationText, tempCalculation;

    // When neither value is present
    if (!leftText && !rightText) {
      setEquationText('');
      setResultText('');
      setResultRaw(null);

      return;
    }

    if (leftText && !operatorRaw && !rightText) {
      tempEqationText = `${leftText}`;

      setEquationText(tempEqationText);
      setResultText(tempEqationText);
      setResultRaw(tempEqationText);

      return;
    }

    if (leftText && operatorRaw && !rightText) {
      tempEqationText = `${leftText}\n${operatorText}`;

      setEquationText(tempEqationText);
      setResultText('');
      setResultRaw(null);

      return;
    }

    if (leftText && operatorRaw && rightText) {
      tempCalculation = calculate(leftRaw, rightRaw, operatorRaw);
      tempEqationText = `${leftText}\n${operatorText}\n${rightText}`;

      setEquationText(tempEqationText);
      if (!isNaN(tempCalculation)) {
        setResultText(numeral(tempCalculation).format(numeralFormat));
        setResultRaw(tempCalculation);
      }
    }
  }, [
    leftRaw,
    leftText,
    rightRaw,
    rightText,
    operatorRaw,
    operatorText,
    calculate,
  ]);

  const onBackPress = () => navigation.goBack();

  const onKeyPress = (item) => {
    const {type, value} = item;

    if (type === CALC_TYPE_OPR) {
      onOperatorPress(item);
    }

    if (type === CALC_TYPE_NUM) {
      onNumPress(value);
    }
  };

  const onNumPress = (value) => {
    console.log('[App] >> [onNumPress]');

    let tempLeftText, tempLeftRaw, tempRightRaw, tempRightText;

    if (operatorRaw) {
      if (value === '.' && !rightText) {
        tempRightText = '0.';
        tempRightRaw = 0;
      } else if (
        value === '.' &&
        rightText &&
        rightText.charAt(rightText.length - 1) === value
      ) {
        // If last char is already a Dot, then return
        return;
      } else {
        tempRightText = rightText ? rightText + value : value;
        tempRightRaw = Number(tempRightText);
        tempRightRaw = roundTo(tempRightRaw, DECIMAL_ROUND_VALUE);
      }

      // Max Input Check
      if (typeof rightRaw === 'number' && tempRightRaw > maxInputNumber) {
        return;
      }

      // Valid Number Check
      if (!validNumRegex.test(tempRightRaw)) {
        return;
      }

      setRightRaw(tempRightRaw);
      setRightText(String(tempRightText));
    } else {
      // Append to left side

      if (value === '.' && !leftText) {
        tempLeftText = '0.';
        tempLeftRaw = 0;
      } else if (
        value === '.' &&
        leftText &&
        leftText.charAt(leftText.length - 1) === value
      ) {
        // If last char is already a Dot, then return
        return;
      } else {
        tempLeftText = leftText ? leftText + value : value;
        tempLeftRaw = Number(tempLeftText);
        tempLeftRaw = roundTo(tempLeftRaw, DECIMAL_ROUND_VALUE);
      }

      // Max Input Check
      if (typeof leftRaw === 'number' && tempLeftRaw > maxInputNumber) {
        return;
      }

      // Valid Number Check
      if (!validNumRegex.test(tempLeftRaw)) {
        return;
      }

      setLeftRaw(tempLeftRaw);
      setLeftText(String(tempLeftText));
    }
  };

  const onOperatorPress = (item) => {
    console.log('[App] >> [onOperatorPress]');

    const {text, value} = item;
    let tempLeftText, tempLeftRaw;

    switch (value) {
      case 'CLEAR':
        clearData();
        break;
      case 'BACK':
        handleBackspace();

        break;
      default:
        // Empty check
        if (!leftText || (!leftText && !rightText && !equationText)) {
          return;
        }

        // Do not allow Operator if either of them is not a valid number
        if (
          (leftText && leftText.charAt(leftText.length - 1) === '.') ||
          (rightText && rightText.charAt(rightText.length - 1) === '.')
        ) {
          return;
        }

        if (!rightText) {
          setOperatorRaw(value);
          setOperatorText(text);

          return;
        }

        if (leftText && rightText && resultText) {
          tempLeftText = resultText;
          tempLeftRaw = resultRaw;

          setOperatorRaw(value);
          setOperatorText(text);
          setLeftText(tempLeftText);
          setLeftRaw(tempLeftRaw);
          setRightText('');
          setRightRaw(null);
        }
        break;
    }
  };

  const calculate = (tempLeftRaw, tempRightRaw, tempOperator) => {
    console.log('[App] >> [calculate]');

    switch (tempOperator) {
      case 'ADD':
        return roundTo(
          Number(tempLeftRaw) + Number(tempRightRaw),
          DECIMAL_ROUND_VALUE,
        );
      case 'SUBSTRACT':
        return roundTo(
          Number(tempLeftRaw) - Number(tempRightRaw),
          DECIMAL_ROUND_VALUE,
        );
      case 'MULTIPLY':
        return roundTo(
          Number(tempLeftRaw) * Number(tempRightRaw),
          DECIMAL_ROUND_VALUE,
        );
      case 'DIVIDE':
        return roundTo(
          Number(tempLeftRaw) / Number(tempRightRaw),
          DECIMAL_ROUND_VALUE,
        );
      default:
        return equationText;
    }
  };

  const clearData = () => {
    console.log('[App] >> [clearData]');

    setLeftRaw(null);
    setLeftText('');
    setRightRaw(null);
    setRightText('');
    setOperatorText('');
    setOperatorRaw(null);
  };

  const handleBackspace = () => {
    console.log('[App] >> [handleBackspace]');

    let tempLeftText, tempLeftRaw, tempRightRaw, tempRightText;

    if (!leftText && !rightText) {
      return;
    }

    if (leftText && !operatorRaw && !rightText) {
      if (leftText.length === 1) {
        setLeftText('');
        setLeftRaw(null);

        return;
      }

      tempLeftText = leftText.substring(0, leftText.length - 1);
      tempLeftRaw = Number(tempLeftText);

      setLeftText(tempLeftText);
      setLeftRaw(tempLeftRaw);
    }

    if (leftText && operatorRaw && !rightText) {
      setOperatorText('');
      setOperatorRaw(null);
    }

    if (leftText && operatorRaw && rightText) {
      if (rightText.length === 1) {
        setRightText('');
        setRightRaw(null);

        return;
      }

      tempRightText = rightText.substring(0, rightText.length - 1);
      tempRightRaw = Number(tempRightText);

      setRightText(tempRightText);
      setRightRaw(tempRightRaw);
    }
  };

  return (
    <SafeAreaWrapper backgroundColor={MIRAGE}>
      <ViewContainer title="Basic Calculator" paddingHorizontal={0}>
        <View style={Style.outerViewCls}>
          {/* Calculation container */}
          <View style={Style.calculationBlock}>
            {/* Equation */}
            {equationText.length > 0 && (
              <Text
                style={[Style.equationTextCls, {fontSize: equationFontSize}]}
                // numberOfLines={3}
                allowFontScaling
                adjustsFontSizeToFit
                minimumFontScale={0.1}
                ellipsizeMode="head">
                {equationText}
              </Text>
            )}

            {/* Result */}
            <Text
              style={[Style.resultTextCls, {fontSize: resultFontSize}]}
              numberOfLines={1}
              allowFontScaling
              adjustsFontSizeToFit
              minimumFontScale={0.1}>
              {resultText}
            </Text>
          </View>

          {/* Gray Separator */}
          <View style={Style.graySeparator} />

          {/* Keypad Container */}
          <Keypad onPress={onKeyPress} />
        </View>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({
  outerViewCls: {
    flex: 1,
  },

  calculationBlock: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginHorizontal: 30,
  },

  graySeparator: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: FADE_TEXT_GREY,
    marginHorizontal: 30,
    marginVertical: 10,
    opacity: 0.3,
  },

  equationTextCls: {
    color: GRAY_GAINSBORO,
    marginBottom: 40,
    textAlign: 'right',
  },

  resultTextCls: {
    color: GRAY_GAINSBORO,
    marginBottom: 20,
  },
});

export default App;
