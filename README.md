# 🌍 Project_Urz_Mobilnych – **Planer podróży**

Aplikacja mobilna do planowania i organizowania podróży, stworzona w ramach projektu uczelnianego.  
Umożliwia tworzenie własnych podróży, dodawanie miejsc, zadań, notatek, zarządzanie budżetem oraz wizualizację trasy na mapie.

---

## 📌 **Opis funkcjonalności**
Użytkownik może:
- Tworzyć podróże i nadawać im tytuły oraz opisy
- Dodawać **punkty na mapie** (atrakcje, miejsca docelowe, hotele)
- Tworzyć **zadania i notatki** powiązane z daną podróżą
- Zarządzać **budżetem i wydatkami**
- Otrzymywać **powiadomienia push** z przypomnieniami
- Przeglądać mapę z zaznaczonymi punktami i korzystać z nawigacji

---

## 🚀 **Technologie i funkcje**

- ⚛️ **React Native** – główny framework
- 🗺️ **Google Maps API** – wyświetlanie i obsługa mapy
- 🔥 **Firebase** – uwierzytelnianie i przechowywanie danych (Cloud Firestore)
- 🧠 **Redux Toolkit** – zarządzanie stanem aplikacji
- 📦 **AsyncStorage** – przechowywanie danych offline
- 📍 **expo-location** – śledzenie lokalizacji
- 🧭 **react-navigation** – nawigacja między ekranami
- 🔔 **Push Notifications** – przypomnienia o zadaniach i wydarzeniach
- 🌐 **Context API** – globalne zarządzanie stanem użytkownika i sesji

---

## 🔑 **Konfiguracja Google Maps**

Klucz Google Maps nie jest już zapisany na stałe w kodzie. Żeby mapa, wyszukiwanie miejsc, hotele i trasy działały:

1. Utwórz lub odśwież klucz w **Google Cloud Console → APIs & Services → Credentials**.
2. Włącz billing dla projektu Google Cloud.
3. Włącz wymagane API:
   - **Maps SDK for Android**
   - **Places API**
   - **Geocoding API**
   - **Directions API**
4. Skopiuj plik przykładowy i wstaw swój klucz:

   ```bash
   cd "zad_travel 3"
   cp .env.example .env
   ```

   Następnie ustaw w `.env`:

   ```bash
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=twój_nowy_klucz_google_maps
   ```

5. Uruchom Expo ponownie, najlepiej z czyszczeniem cache:

   ```bash
   npx expo start -c
   ```

Jeśli używasz restrykcji klucza, upewnij się, że klucz dopuszcza pakiet Androida `com.travels.travelsapp` i API wymienione powyżej.

---

## 🗺️ **Struktura nawigacji**

- **Lista podróży** – ekran główny
- **Szczegóły podróży** – miejsca, zadania, notatki, budżet
- **Mapa** – interaktywna mapa z zaznaczonymi punktami
- **Ekran tworzenia/edycji** – dodawanie nowych elementów

---

## 👨‍💻 **Zespół deweloperski**

| Imię i nazwisko | Numer indeksu |
|-----------------|---------------|
| iiii iiii       | iiii          |
| Nikita Sukhovoi | 44090         |
| iiii iiii       | iiiii         |

---
