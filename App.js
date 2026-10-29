
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './AppContext';
import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200',
        }}
        resizeMode="cover"
        style={styles.hero}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>F</Text>
          </View>

          <Text style={styles.brand}>Foodie</Text>
          <Text style={styles.tagline}>Good food. Made with love.</Text>

          <Text style={styles.heading}>
            Discover your{'\n'}next favourite meal.
          </Text>
          <Text style={styles.description}>
            Explore delicious recipes, save your favourites,
            and share the meals you love.
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>YOUR DAILY DOSE OF DELICIOUS</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#173D2A' },
  hero: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 35, 22, 0.62)',
  },
  content: { paddingHorizontal: 28, paddingBottom: 54 },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#DDF1D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: { fontSize: 30, fontWeight: '800', color: '#23623C' },
  brand: { fontSize: 34, fontWeight: '800', color: '#FFFFFF' },
  tagline: { fontSize: 14, color: '#DDEBDD', marginTop: 3 },
  heading: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 48,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#E8F0E8',
    marginTop: 14,
    marginBottom: 26,
  },
  button: {
    height: 56,
    borderRadius: 17,
    backgroundColor: '#B9E4A8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '800', color: '#204C30' },
  arrow: { fontSize: 22, color: '#204C30', marginLeft: 12 },
  footer: {
    color: '#DDEBDD',
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 30,
  },
});
