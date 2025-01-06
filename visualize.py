import pandas as pd
import json

with open("./usage_data.json") as f:
    data = json.load(f)

df = pd.DataFrame(data)

print(df.head())
print(df.columns)
print(df.describe())
