
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { AppContext } from '../AppContext';
import { CATEGORIES, RECIPES } from '../data';

const GREEN = '#276749';
const PALE = '#EAF4E7';
const MUTED = '#718078';

export default function HomeScreen({ navigation }) {
  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');

  const {
    favorites,
    toggleFavorite,
    myRecipes,
    deleteRecipe,
  } = useContext(AppContext);

  const allRecipes = [...RECIPES, ...myRecipes];
  const tabs = ['All', ...CATEGORIES, 'Favorites', 'My Food'];

  let recipes = allRecipes;

  if (selected === 'Favorites') {
    recipes = allRecipes.filter((item) => favorites.includes(item.id));
  } else if (selected === 'My Food') {
    recipes = myRecipes;
  } else if (selected !== 'All') {
    recipes = RECIPES.filter((item) => item.category === selected);
  }

  recipes = recipes.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const confirmDelete = (id) => {
    Alert.alert('Delete recipe?', 'This recipe will be removed from My Food.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteRecipe(id),
      },
    ]);
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      >
        <Image
          source={{
            uri: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
          }}
          style={styles.recipeImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleFavorite(item.id)}
        accessibilityLabel={
          favorites.includes(item.id) ? 'Remove favorite' : 'Add favorite'
        }
      >
        <Text style={styles.heartText}>
          {favorites.includes(item.id) ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardInfo}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      >
        <Text style={styles.recipeName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.recipeMeta}>
          {item.prepTime || 'Time varies'} · {item.difficulty || 'Homemade'}
        </Text>
        <Text style={styles.viewRecipe}>View recipe  →</Text>
      </TouchableOpacity>

      {selected === 'My Food' && (
        <View style={styles.manageRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('AddRecipe', { recipe: item })}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.eyebrow}>FRESH IDEAS, EVERY DAY</Text>
          <Text style={styles.title}>Hello, Foodie!</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>F</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>What would you like to cook today?</Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search delicious recipes..."
          placeholderTextColor="#8A978E"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearSearch}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore categories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {tabs.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelected(category)}
            style={[
              styles.categoryChip,
              selected === category && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selected === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            {selected === 'All' ? 'Popular recipes' : selected}
          </Text>
          <Text style={styles.resultCount}>
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} to explore
          </Text>
        </View>

        {selected === 'My Food' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddRecipe')}
          >
            <Text style={styles.addButtonText}>+ Add recipe</Text>
          </TouchableOpacity>
        )}
      </View>

      {recipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nothing on the menu yet</Text>
          <Text style={styles.emptyText}>
            {selected === 'Favorites'
              ? 'Tap the heart on a recipe to save it here.'
              : selected === 'My Food'
              ? 'Add your first recipe and make it yours.'
              : 'Try another search or category.'}
          </Text>
          {selected === 'My Food' && (
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddRecipe')}
            >
              <Text style={styles.emptyButtonText}>Create a recipe</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          key={selected}
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAF6', paddingTop: 10 },
  topBar: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: { color: GREEN, fontSize: 10, fontWeight: '800', letterSpacing: 1.6 },
  title: { color: '#20372A', fontSize: 27, fontWeight: '800', marginTop: 5 },
  avatar: {
    width: 46, height: 46, borderRadius: 16, backgroundColor: PALE,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: GREEN, fontSize: 23, fontWeight: '800' },
  subtitle: { color: MUTED, fontSize: 14, marginHorizontal: 20, marginTop: 6 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 20,
    marginTop: 20, marginBottom: 22, paddingHorizontal: 14, height: 50,
    borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7EDE5',
  },
  searchIcon: { fontSize: 25, color: GREEN, marginRight: 9 },
  searchInput: { flex: 1, color: '#20372A', fontSize: 14 },
  clearSearch: { fontSize: 22, color: MUTED, paddingHorizontal: 4 },
  sectionHeader: {
    paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#20372A' },
  resultCount: { color: MUTED, fontSize: 12, marginTop: 4 },
  categoryList: { paddingHorizontal: 20, paddingBottom: 23, gap: 9 },
  categoryChip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22,
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2EAE0',
  },
  categoryActive: { backgroundColor: GREEN, borderColor: GREEN },
  categoryText: { color: '#53645A', fontSize: 12, fontWeight: '600' },
  categoryTextActive: { color: '#FFFFFF' },
  recipeList: { paddingHorizontal: 15, paddingBottom: 28 },
  cardRow: { justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18,
    marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#EDF0E9',
  },
  recipeImage: { width: '100%', height: 125, backgroundColor: PALE },
  heart: {
    position: 'absolute', top: 9, right: 9, width: 33, height: 33,
    borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: { color: '#D45B5B', fontSize: 23, lineHeight: 26 },
  cardInfo: { padding: 11 },
  recipeName: { color: '#20372A', fontWeight: '800', fontSize: 14 },
  recipeMeta: { color: MUTED, fontSize: 11, marginTop: 7 },
  viewRecipe: { color: GREEN, fontSize: 11, fontWeight: '800', marginTop: 10 },
  manageRow: { flexDirection: 'row', gap: 7, paddingHorizontal: 10, paddingBottom: 10 },
  editButton: {
    flex: 1, alignItems: 'center', padding: 8, backgroundColor: PALE, borderRadius: 9,
  },
  editText: { color: GREEN, fontSize: 12, fontWeight: '700' },
  deleteButton: {
    flex: 1, alignItems: 'center', padding: 8, backgroundColor: '#FCECEC', borderRadius: 9,
  },
  deleteText: { color: '#B33B3B', fontSize: 12, fontWeight: '700' },
  addButton: { backgroundColor: GREEN, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  addButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  emptyState: {
    margin: 20, padding: 25, backgroundColor: '#FFFFFF', borderRadius: 20,
    alignItems: 'center', borderWidth: 1, borderColor: '#E7EDE5',
  },
  emptyTitle: { color: '#20372A', fontSize: 17, fontWeight: '800', textAlign: 'center' },
  emptyText: { color: MUTED, fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 8 },
  emptyButton: { backgroundColor: GREEN, borderRadius: 12, padding: 12, marginTop: 15 },
  emptyButtonText: { color: '#FFFFFF', fontWeight: '700' },
});
