import concurrent.futures
import csv
import requests

def update_eta(s, eta):
    response = requests.get('https://order.dominos.com/power/store/'+str(s)+'/profile').json()
    eta = response['EstimatedWaitMinutes']
    time = response['StoreAsOfTime']
    return s, eta, time

# Open the file in read mode
with open('stats.csv', 'r') as csvfile:
    # Create a CSV reader object
    reader = csv.reader(csvfile)

    # Read the header row
    header = next(reader)

    # Create a list of tasks
    tasks = [(row[0], row[1]) for row in reader]

# Create a thread pool
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit the tasks as threads
    results = [executor.submit(update_eta, s, eta) for s, eta in tasks]

    # Create a list to store the updated rows
    rows = []

    # Iterate over the completed tasks and process the results
    for future in concurrent.futures.as_completed(results):
        s, eta, time = future.result()
        rows.append([s, eta, time])

# Open the file in write mode
with open('stats.csv', 'w', newline='') as csvfile:
    # Create a CSV writer object
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(header)

    # Write the updated rows
    for row in rows:
        writer.writerow(row)
