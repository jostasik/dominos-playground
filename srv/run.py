import concurrent.futures
import csv
import requests
import os
import json

def update_eta(store_info):
    r = requests.get('https://order.dominos.com/power/store/'+str(store_info[0])+'/profile').json()
    try:
        isOpen = r["IsOpen"]
        storeTime = r["StoreAsOfTime"]
        deliveryEta = r['EstimatedWaitMinutes']
        # Return all of the columns from the input file
        return store_info[0], store_info[1], store_info[2], store_info[3], store_info[4], store_info[5], store_info[6], isOpen, storeTime, deliveryEta
    except Exception as e:
        print(e)
        # Return all of the columns from the input file, with 'error' values for the additional data
        return store_info[0], store_info[1], store_info[2], store_info[3], store_info[4], store_info[5], store_info[6], 'error', 'error', 'error'



with open('storeData.csv', 'r') as csvfile:
    # Create a CSV reader object
    reader = csv.reader(csvfile)

    # Read the header row
    header = next(reader)

    # Create a list of tasks
    tasks = [(row) for row in reader]

# Create a thread pool
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit the tasks as threads
    results = [executor.submit(update_eta, store) for store in tasks]

    # Create a list to store the updated rows
    rows = []

    # Iterate over the completed tasks and process the results
for future in concurrent.futures.as_completed(results):
    # Unpack all of the values returned by the update_eta function
    store, latitude, longitude, city, state, franchisee, phone, isOpen, storeTime, deliveryEta = future.result()
    rows.append([store, latitude, longitude, city, state, franchisee, phone, isOpen, storeTime, deliveryEta])


# Open the file in write mode
with open('latestStats.csv', 'w', newline='') as csvfile:
    # Create a CSV writer object
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(['StoreID', 'Latitude', 'Longitude', 'City', 'State', 'Franchisee', 'Phone', 'IsOpen', 'StoreAsOfTime', 'EstimatedWaitMinutes'])

    # Write the updated rows
    for row in rows:
        writer.writerow(row)
