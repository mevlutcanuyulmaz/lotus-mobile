import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { CheckCircle2, CircleAlert } from 'lucide-react-native';

type AppToastProps = {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error';
  durationMs?: number;
  onHide: () => void;
};

const AppToast = ({
  visible,
  title,
  message,
  type = 'success',
  durationMs = 2200,
  onHide,
}: AppToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(onHide);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [visible, durationMs, onHide, opacity, translateY]);

  if (!visible) return null;

  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle2 : CircleAlert;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="none"
    >
      <View style={styles.card}>
        <View style={[styles.iconWrap, isSuccess ? styles.iconSuccess : styles.iconError]}>
          <Icon size={18} color={isSuccess ? '#166534' : '#991B1B'} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconSuccess: {
    backgroundColor: '#DCFCE7',
  },
  iconError: {
    backgroundColor: '#FEE2E2',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
});

export default AppToast;
