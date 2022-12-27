import concurrent.futures
import csv
import requests

def update_eta(store):
    r = requests.get('https://order.dominos.com/power/store/'+str(store)+'/profile').json()
    try:
        phone = r["Phone"]
        street = r["StreetName"]
        city = r["City"]
        state = r["Region"]
        zipcode = r["PostalCode"]
        isOpen = r["IsOpen"]
        storeTime = r["StoreAsOfTime"]
        latitude = r["StoreLocation"]["Latitude"]
        longitude = r["StoreLocation"]["Longitude"]
        carryoutEta = r["EstimatedWaitMinutes"]
        deliveryEta = r["EstimatedWaitMinutes"]
        return store, phone, street, city, state, zipcode, isOpen, storeTime, latitude, longitude, carryoutEta, deliveryEta
    except Exception as e:
        print(e)
        return

with open('table.csv', 'r') as csvfile:
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
        store, phone, street, city, state, zipcode, isOpen, storeTime, latitude, longitude, carryoutEta, deliveryEta = future.result()
        rows.append([store, phone, street, city, state, zipcode, isOpen, storeTime, latitude, longitude, carryoutEta, deliveryEta])

# Open the file in write mode
with open('stats.csv', 'w', newline='') as csvfile:
    # Create a CSV writer object
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(header)

    # Write the updated rows
    for row in rows:
        writer.writerow(row)
