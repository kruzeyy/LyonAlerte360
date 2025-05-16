import pandas as pd
import ast
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import classification_report

# === 1. Chargement des données ===
df = pd.read_csv("Donné\\4-Processed\\clean_file.csv")  # Remplace par le vrai nom de ton fichier si besoin

# === 2. Normalisation de la colonne 'catastrophe' ===
def normalize_catastrophe(x):
    if x == "aucun":
        return []
    if isinstance(x, str):
        return ast.literal_eval(x)
    return x

df["catastrophe"] = df["catastrophe"].apply(normalize_catastrophe)

# === 3. Encodage multilabel de la colonne 'catastrophe' ===
mlb = MultiLabelBinarizer()
y = pd.DataFrame(mlb.fit_transform(df["catastrophe"]), columns=mlb.classes_)

# === 4. Suppression de la colonne 'catastrophe' ===
df = df.drop(columns="catastrophe")

# === 5. Extraction des informations de date ===
df["date"] = pd.to_datetime(df["date"])
df["day"] = df["date"].dt.day
df["mois"] = df["date"].dt.month
df["annee"] = df["date"].dt.year
df = df.drop(columns="date")

# === 6. Encodage du quartier ===
df = pd.get_dummies(df, columns=["quartier"])

# === 7. Séparation des données ===
X = df
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# === 8. Entraînement du modèle ===
model = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
model.fit(X_train, y_train)

# === 9. Prédictions ===
y_pred = model.predict(X_test)

# === 10. Évaluation ===
print("=== Rapport de classification ===")
print(classification_report(y_test, y_pred, target_names=mlb.classes_))

# === 11. Exemple de prédiction manuelle ===
nouvelle_donnee = pd.DataFrame([{
    "temperature": 21.0,
    "humidite": 68.0,
    "force_moyenne_du_vecteur_de_vent": 3.5,
    "force_du_vecteur_de_vent_max": 5.0,
    "sismicite": 0.9,
    "concentration_gaz": 500.0,
    "pluie_totale": 331.0,
    "day":13,
    "mois": 1,
    "annee": 23000,
    "quartier_Zone 2": 1,
    "quartier_Zone 3": 0,
    "quartier_Zone 4": 0

}])

# S'assurer que les colonnes sont dans le bon ordre
for col in X.columns:
    if col not in nouvelle_donnee.columns:
        nouvelle_donnee[col] = 0
nouvelle_donnee = nouvelle_donnee[X.columns]

# Prédiction
prediction = model.predict(nouvelle_donnee)
resultats = mlb.inverse_transform(prediction)
print("=== Catastrophes prédites pour la nouvelle donnée ===")
print(resultats)

