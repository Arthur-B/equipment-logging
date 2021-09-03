# %%
# Setup Django

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "equipmentlog.settings")
import django
django.setup()

# %%
# Rest of the imports

import csv
import datetime
from sputter.models import Deposition_RF

# %%
# Formatting functions


def format_deposition_day(deposition_day: str):
    if deposition_day != '':
        return datetime.datetime.strptime(deposition_day, "%m/%d/%Y")
    else:
        return None


def format_deposition_time(deposition_time: str):
    if deposition_time != '':
        deposition_time = deposition_time.split(sep=":")
        deposition_time = datetime.timedelta(hours=int(deposition_time[0]),
                                            minutes=int(deposition_time[1]),
                                            seconds=int(deposition_time[2]))
    else:
        deposition_time = None
    
    return deposition_time


def format_str_to_float(float_str: str):
    if float_str != '':
        return float(float_str)
    else:
        return None


def format_str_to_int(int_str: str):
    if int_str != '':
        return int(int_str)
    else:
        return None


# %%
# Main function


def main():

    file_name = "APMD log - sputter_log.csv"

    with open(file_name, 'r') as f:
        reader = csv.DictReader(f, delimiter=',')
        for line in reader:
            if line['Mode (RF / DC)'] == 'RF':

                # Make the object

                _, deposition = Deposition_RF.objects.get_or_create(
                    day = format_deposition_day(line['Date (MM/DD/YYYY)']),
                    user = line['User'],
                    material = line['Target'],
                    power = format_str_to_int(line['Power (RF: W / DC: A)']), 
                    pressure = format_str_to_float(line['Pressure (mTorr)']),
                    mfc_flow = format_str_to_float(line['MFC flow (sccm)']),
                    deposition_time = format_deposition_time(line['Time']),
                    thickness = format_str_to_float(line['Thickness (nm)']),
                    comment = line['Comment']
                )

                print(deposition)

                # Put it into the database
                
    print("Import completed")
# %%
# Run the main function

if __name__ == '__main__':
    main()