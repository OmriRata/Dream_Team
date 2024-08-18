import pandas as pd

# Load the CSV file
df = pd.read_csv('players_stats.csv')

# Extract the specific columns
selected_columns = df[['name', 'Overall Rating']]

# Save the extracted columns to a new CSV file
selected_columns.to_csv('selected_players_stats.csv', index=False)

print("Selected columns have been saved to 'selected_players_stats.csv'")
