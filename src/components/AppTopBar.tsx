import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { appTheme } from '../theme/appTheme';

type AppTopBarProps = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  backLabel?: string;
  rightContent?: ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const AppTopBar = ({
  title,
  onBack,
  showBack = true,
  backLabel = 'Geri',
  rightContent,
  containerStyle,
  titleStyle,
}: AppTopBarProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={onBack}>
          <ChevronLeft size={16} color="#0F172A" />
          <Text style={styles.backButtonText}>{backLabel}</Text>
        </TouchableOpacity>
      ) : null}
      <Text numberOfLines={1} style={[styles.title, !showBack && styles.titleNoBack, titleStyle]}>
        {title}
      </Text>
      {rightContent ? <View style={styles.rightContent}>{rightContent}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: appTheme.colors.white,
    borderWidth: 1,
    borderColor: appTheme.colors.cardBorder,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#6D5DFB',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 13,
    color: appTheme.colors.textPrimary,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 22,
    color: appTheme.colors.textPrimary,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  titleNoBack: {
    marginLeft: 0,
  },
  rightContent: {
    marginLeft: 10,
  },
});

export default AppTopBar;
