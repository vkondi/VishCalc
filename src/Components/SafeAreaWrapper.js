import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {OVERLAY_BG} from '@constants/Colors';

const SafeAreaWrapper = ({children, backgroundColor}) => {
  // const insets = useSafeAreaInsets();
  // console.log('Insets', insets);
  // const defaultInsets = {
  //   paddingBottom: insets.bottom,
  //   paddingTop: insets.top,
  // };

  return (
    <>
      {backgroundColor instanceof Array ? (
        <LinearGradient colors={backgroundColor} style={[Style.outerViewCls]}>
          <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
        </LinearGradient>
      ) : (
        <SafeAreaView
          style={[Style.outerViewCls, {backgroundColor: backgroundColor}]}>
          {children}
        </SafeAreaView>
      )}
    </>
  );
};

const Style = StyleSheet.create({
  outerViewCls: {
    flex: 1,
  },
});

SafeAreaWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

SafeAreaWrapper.defaultProps = {
  backgroundColor: OVERLAY_BG,
};

export default SafeAreaWrapper;
