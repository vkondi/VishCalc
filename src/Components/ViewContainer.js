import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import SafeAreaWrapper from './SafeAreaWrapper';

import * as Colors from '@constants/Colors';

const HeaderIconSpacer = () => {
  return <View style={{width: 30, height: 30}} />;
};

const TitleBar = ({title, headerLeftComponent, headerRightComponent}) => {
  return (
    <View style={Style.headerViewCls}>
      {/* Left Icon */}
      {headerLeftComponent ? headerLeftComponent : <HeaderIconSpacer />}

      {/* Title Text */}
      <Text style={Style.titleTextCls}>{title}</Text>

      {/* Left Icon */}
      {headerRightComponent ? headerRightComponent : <HeaderIconSpacer />}
    </View>
  );
};

const ViewContainer = ({
  children,
  backgroundColor,
  title,
  paddingHorizontal,
  paddingBottom,
  headerLeftComponent,
  headerRightComponent,
  useSafeArea,
  scrollable,
}) => {
  const mainContent = () => {
    return (
      <>
        {/* Header Component */}
        <TitleBar
          title={title}
          headerLeftComponent={headerLeftComponent}
          headerRightComponent={headerRightComponent}
        />

        {/* Container Children */}
        {scrollable ? (
          <ScrollView
            style={[
              Style.innerViewCls,
              {paddingHorizontal, marginBottom: paddingBottom},
            ]}>
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              Style.innerViewCls,
              {paddingHorizontal, paddingBottom: paddingBottom},
            ]}>
            {children}
          </View>
        )}
      </>
    );
  };

  return (
    <View style={[Style.outerViewCls, {backgroundColor}]}>
      {/* Safe Area Included */}
      {useSafeArea && <SafeAreaWrapper>{mainContent()}</SafeAreaWrapper>}

      {/* Safe Are Not Included */}
      {!useSafeArea && <>{mainContent()}</>}
    </View>
  );
};

const Style = StyleSheet.create({
  outerViewCls: {
    flex: 1,
  },

  innerViewCls: {
    flex: 1,
  },

  titleTextCls: {
    color: Colors.PROGRESS_BAR_GRAY,
    fontSize: 22,
  },

  headerViewCls: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

ViewContainer.propTypes = {
  children: PropTypes.element.isRequired,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  paddingBottom: PropTypes.number,
  headerLeftComponent: PropTypes.node,
  headerRightComponent: PropTypes.node,
  useSafeArea: PropTypes.bool,
  scrollable: PropTypes.bool,
};

ViewContainer.defaultProps = {
  backgroundColor: 'transparent',
  title: '',
  paddingHorizontal: 30,
  paddingBottom: 0,
  headerLeftComponent: null,
  headerRightComponent: null,
  useSafeArea: false,
  scrollable: false,
};

export default ViewContainer;
