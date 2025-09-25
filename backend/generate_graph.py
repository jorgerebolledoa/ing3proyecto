import matplotlib
matplotlib.use('Agg')

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import os

def generate_graph(start_date=None, end_date=None):
    plt.style.use('seaborn-v0_8-whitegrid')
    plt.rcParams['figure.figsize'] = (16, 9)
    plt.rcParams['agg.path.chunksize'] = 10000

    try:
        script_dir = os.path.dirname(__file__)
        file_path = os.path.join(script_dir, 'data', 'NOX-2020.csv')
        data = pd.read_csv(file_path, sep='\t')

        data.columns = data.columns.str.replace('"', '', regex=False)
        data['Timestamp'] = pd.to_datetime(data['Date.Local'] + ' ' + data['Time.Local'])
        data.set_index('Timestamp', inplace=True)
        data.sort_index(inplace=True)

        if start_date and end_date:
            filtered_data = data.loc[start_date:end_date]
            title = f'Mediciones de NOX desde {start_date} hasta {end_date}'
        else:
            filtered_data = data
            title = 'Mediciones de NOX a lo largo del tiempo (2020)'

        if filtered_data.empty:
            return {"status": "error", "message": "No se encontraron datos para el rango especificado."}

        fig, ax = plt.subplots()

        ax.plot(filtered_data.index, filtered_data['Sample.Measurement'], 
                label='Medición de NOX', color='#00529B', linewidth=1.0)

        ax.set_title(title, fontsize=18, weight='bold', pad=20)
        ax.set_xlabel('Fecha y Hora', fontsize=12)
        ax.set_ylabel('Nivel de Muestra (Sample.Measurement)', fontsize=12)

        locator = mdates.AutoDateLocator()
        formatter = mdates.ConciseDateFormatter(locator)
        ax.xaxis.set_major_locator(locator)
        ax.xaxis.set_major_formatter(formatter)

        ax.legend()
        ax.grid(True, which='both', linestyle='--', linewidth=0.5)
        fig.tight_layout()

        output_path = os.path.join(script_dir, '..', 'public', 'TS-NOX-202.png')
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        plt.close(fig)

        return {"status": "success", "path": output_path}

    except FileNotFoundError:
        return {"status": "error", "message": f"Archivo de datos no encontrado en: {file_path}"}
    except Exception as e:
        return {"status": "error", "message": f"Ocurrió un error inesperado: {e}"}