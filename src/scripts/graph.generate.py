import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import argparse
import sys

def generate_graph(start_date=None, end_date=None):
    plt.rcParams['agg.path.chunksize'] = 10000

    try:
        file = '../data/NOX-2020.csv'
        data = pd.read_csv(file, sep='\t')

        data.columns = data.columns.str.replace('"', '', regex=False)

        required_cols = ['Date.Local', 'Time.Local', 'Sample.Measurement']
        if not all(col in data.columns for col in required_cols):
            print(f"Columns found: {data.columns.tolist()}")
            sys.exit(1)

        data['Timestamp'] = pd.to_datetime(data['Date.Local'] + ' ' + data['Time.Local'])
        data.set_index('Timestamp', inplace=True)

        data.sort_index(inplace=True)

        if start_date and end_date:
            filtered_data = data.loc[start_date:end_date]
            title = f'NOX measures from {start_date} to {end_date}'
        else:
            filtered_data = data
            title = 'NOX measures over time (2020)'

        if filtered_data.empty:
            print("No data found for the specified date range.")
            return

        print("Generating graph... This may take a moment.")
        plt.style.use('seaborn-v0_8-whitegrid')
        fig, ax = plt.subplots(figsize=(15, 8))

        ax.plot(filtered_data.index, filtered_data['Sample.Measurement'], marker='', linestyle='-', color='b', linewidth=0.5)

        ax.set_title(title, fontsize=16)
        ax.set_xlabel('Date and hour', fontsize=12)
        ax.set_ylabel('Sample measurement (Sample.Measurement)', fontsize=12)

        ax.xaxis.set_major_locator(mdates.MonthLocator())
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
        plt.gcf().autofmt_xdate()

        output_path = '../assets/rangeGraph.png'
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"Successfully saved: {output_path}")

    except FileNotFoundError:
        print(f"Error: Input file not found. Verify the path: {file}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generates a time-series graph from NOX data, with an optional date range.")
    parser.add_argument('--start', type=str, help="Start date/time in 'YYYY-MM-DD HH:MM' format")
    parser.add_argument('--end', type=str, help="End date/time in 'YYYY-MM-DD HH:MM' format")
    args = parser.parse_args()

    generate_graph(args.start, args.end)