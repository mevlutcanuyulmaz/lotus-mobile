import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SubscriptionCheckScreen from '../screens/welcome/SubscriptionCheckScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileSummaryScreen from '../screens/profile/ProfileSummaryScreen';
import WeeklyPlansScreen from '../screens/plan/WeeklyPlansScreen';
import DailyPlansScreen from '../screens/plan/DailyPlansScreen';
import DayExercisesScreen from '../screens/plan/DayExercisesScreen';
import ExerciseCatalogScreen from '../screens/exercise/ExerciseCatalogScreen';
import ExerciseSegmentsScreen from '../screens/exercise/ExerciseSegmentsScreen';
import { apiClient } from '../services/api';
import { clearSessionToken, getCurrentUser, restoreSessionToken } from '../services/auth';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    apiClient.setUnauthorizedHandler(async () => {
      await clearSessionToken();
      setIsAuthenticated(false);
    });

    return () => {
      apiClient.setUnauthorizedHandler(null);
    };
  }, []);

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        const token = await restoreSessionToken();
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        await getCurrentUser(token);
        setIsAuthenticated(true);
      } catch {
        await clearSessionToken();
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true);
      }
    };

    bootstrapSession();
  }, []);

  if (!isAuthChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerShadowVisible: false,
          headerTintColor: '#1A1A1A',
          headerTitle: '',
          headerBackTitle: '',
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} onLogout={() => setIsAuthenticated(false)} />}
            </Stack.Screen>
            <Stack.Screen name="ProfileSummary" options={{ headerShown: false }}>
              {(props) => <ProfileSummaryScreen {...props} onLogout={() => setIsAuthenticated(false)} />}
            </Stack.Screen>
            <Stack.Screen name="WeeklyPlans" component={WeeklyPlansScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DailyPlans" component={DailyPlansScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DayExercises" component={DayExercisesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExerciseCatalog" component={ExerciseCatalogScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExerciseSegments" component={ExerciseSegmentsScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="SubscriptionCheck" 
              component={SubscriptionCheckScreen} 
            />
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ headerShown: false }}>
              {(props) => <RegisterScreen {...props} onAuthenticated={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen} 
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
