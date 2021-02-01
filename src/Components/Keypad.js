import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {KEYPAD_KEYS, KEYPAD_ACTIONS} from '@constants/Data';
import {PROGRESS_BAR_GRAY, ORANGE} from '@constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const numFontSize = (screenHeight * 3) / 100;

const keypadHeight = (screenHeight * 50) / 100;

const actionsContWidth = (screenWidth * 25) / 100;

const keysContWidth = (screenWidth * 75) / 100;
const keysBlockWidth = Math.round(keysContWidth / 3) - 5;
const keysBlockHeight = (keypadHeight * 25) / 100;

const Keypad = ({onPress}) => {
  const onKeyPress = (item) => {
    onPress(item);
  };

  return (
    <View style={[Style.outerViewCls, {height: keypadHeight}]}>
      <View style={[Style.keysContCls, {width: keysContWidth}]}>
        {KEYPAD_KEYS.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                Style.keysBlockCls,
                {
                  width: keysBlockWidth,
                  height: keysBlockHeight,
                },
              ]}
              onPress={() => onKeyPress(item)}
              key={index}
              item={item}>
              {item.value === 'DOT' ? (
                <FontAwesomeIcon
                  icon={item.icon}
                  color={PROGRESS_BAR_GRAY}
                  size={7}
                />
              ) : item.value === 'BACK' ? (
                <FontAwesomeIcon icon={item.icon} color={ORANGE} size={25} />
              ) : (
                <Text style={{color: PROGRESS_BAR_GRAY, fontSize: numFontSize}}>
                  {item.text}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[Style.actionsContCls, {width: actionsContWidth}]}>
        {KEYPAD_ACTIONS.map((item, index) => {
          return (
            <TouchableOpacity
              style={Style.actionsBlockCls}
              onPress={() => onKeyPress(item)}
              key={index}
              item={item}>
              <FontAwesomeIcon icon={item.icon} color={ORANGE} size={23} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  outerViewCls: {
    width: '100%',
    flexDirection: 'row',
  },

  keysContCls: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  actionsContCls: {
    height: '100%',
  },

  keysBlockCls: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionsBlockCls: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

Keypad.propTypes = {
  onPress: PropTypes.func.isRequired,
};

Keypad.defaultProps = {
  onPress: () => {},
};

const Memoiz = React.memo(Keypad);
export default Memoiz;
