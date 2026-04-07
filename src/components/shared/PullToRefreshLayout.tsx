import React from 'react';
import { ScrollView, RefreshControl, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface PullToRefreshLayoutProps {
  children: React.ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const PullToRefreshLayout: React.FC<PullToRefreshLayoutProps> = ({
  children,
  onRefresh,
  refreshing,
  style,
  contentContainerStyle,
}) => {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#3B82F6']} // Sky Blue
          tintColor={'#3B82F6'}
        />
      }
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PullToRefreshLayout;
