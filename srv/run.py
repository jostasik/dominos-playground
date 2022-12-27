import concurrent.futures
import csv
import requests
import os
import json

def update_eta(store):
    r = requests.get('https://order.dominos.com/power/store/'+str(store)+'/profile').json()
    try:
        isOpen = r["IsOpen"]
        phone = r["Phone"]
        latitude = r["StoreLocation"]["Latitude"]
        longitude = r["StoreLocation"]["Longitude"]
        city = r["City"]
        state = r["Region"]
        storeTime = r["StoreAsOfTime"]
        deliveryEta = r['EstimatedWaitMinutes']
        return store, isOpen, phone, latitude, longitude, city, state, storeTime, deliveryEta
    except Exception as e:
        print(e)
        return store, None, None, None

with open('persistData.csv', 'r') as csvfile:
    # Create a CSV reader object
    reader = csv.reader(csvfile)

    # Read the header row
    header = next(reader)

    # Create a list of tasks
    tasks = [(row[0]) for row in reader]

# Create a thread pool
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit the tasks as threads
    results = [executor.submit(update_eta, store) for store in tasks]

    # Create a list to store the updated rows
    rows = []

    # Iterate over the completed tasks and process the results
    for future in concurrent.futures.as_completed(results):
        store, isOpen, phone, latitude, longitude, city, state, storeTime, deliveryEta = future.result()
        rows.append([store, isOpen, phone, latitude, longitude, city, state, storeTime, deliveryEta])

# Open the file in write mode
with open('refreshData.csv', 'w', newline='') as csvfile:
    # Create a CSV writer object
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(['Store', 'IsOpen', 'Phone', 'Latitude', 'Longitude', 'City', 'Region', 'StoreAsOfTime', 'EstimatedWaitMinutes'])

    # Write the updated rows
    for row in rows:
        writer.writerow(row)
