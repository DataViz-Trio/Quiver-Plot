# Quiver-And-Treemap

This github repo has the code for the treemap and the quiver plot implementation for Assignment 2 of the Data Visualization Course.

## Results 


## Quiver Plot


### How to Run the IPython Notebooks

### 1. Clone the Repository:

```bash
git clone https://github.com/DataViz-Trio/Quiver-And-Treemap.git
```

### 2. Navigate to the Repository:
```bash
cd Quiver-And-Treemap/Quiver Plot
```

### 3. Install Required Libraries:
```bash
pip install matplotlib numpy scikit-image cartopy
```

### 4. Install Jupyter(if not installed):
```bash
pip install jupyter
```

### 4. Launch Jupyter Notebook:
```bash
jupyter notebook 'QuiverPlotSameSize.ipynb'
```

To get the visualizations, run the python notebooks that are present in the Quiver Plot folder. You get a gif with the same size quivers on running the `QuiverPlotSameSize.ipynb` file and the other notebook `QuiverPlotDifferentSize.ipynb` to get the gif of the `magnitude proportional quivers`.

### Dataset Description


The quiver plot visualization used the OSCAT Wind Dataset downloaded from the Incois website. 

- The First Six lines of the dataset provide some information about the dataset such as the variable being plotted (zonal wind speed or meridional wind speed in this case), the Flag which denotes a bad value (-1E+34 in this dataset), the number of rows and columns in the dataset and the date on which the data was collected.

- From the 7th line, the data is presented. The dataset follows the following pattern:

  - Each column corresponds to a longitude. The longitudes begin at 0E , go to 180E and then end at 116.5W.
  -  Each row corresponds to a latitude. The latitudes begin at 89.75S and end at 89.75N.
  - Each cell corresponding to a column (longitude) and a row (latitude) contains the zonal wind speed in one dataset and the meridional wind speed in the other at that longitude and latitude.

The datasets were downloaded from Feb 6th 2012 to Feb 12th 2012, where one dataset corresponds to the zonal wind speed and the other corresponds to the meridional wind speed for each day.

### Data Processing

- The datasets were stored as .txt files in separate folders corresponding to the zonal wind speed dataset and the meridional wind speed dataset for each day. 
- These text files were loaded using the ‘glob’ method provided by python. 
- We ignore the first 6 lines and start reading the text file from the 7th line using the ‘read_table’ function of the pandas library. 
- The columns are renamed as follows, the whitespace in the column names are removed, then if ‘E’ is present then it is removed, else if ‘W’ is present, then the W is removed and the negation of the value is taken.
- The BAD_FLAG in the dataset is replaced with null values.
- The data frames corresponding to each attribute are stored in separate lists.

### Implementation

The quiver plot visualizations were done on a part of the dataset(Grid Sampling Experiments), i.e a set of latitudes and longitudes were selected to get a less cluttered visualization and a better inference.  

We experimented with different parts of the world map along with different dates and noticed that from Feb 6th 2012 to Feb 12th 2012 , in the region where longitude range [30E , 49.5E] and the latitude range [29.75S, 15.25S] a major change in the direction of the wind speed was noticed along different magnitudes.

The quivers are drawn on a world map using the ‘PlateCarree’ function.

The latitude and longitude set selected was then formated to the matrix form using the `meshgrid` function of numpy and then these parameters along with the zonal and meridonal speeds stored in the data processing phase are inserted to `plt.quiver(lat,lon,U,V)`.

Two types of quiver plots are implemented using the resultant datasets and each type has a separate python notebook with the implementation: 

- Magnitude Proportional Vectors
  - The size of the quiver is proportional to the magnitude of the wind speed, i.e the magnitude of the resultant vector of the zonal and meridional wind speed at the given latitude and longitude position.
  - The direction is determined by the direction of the resultant vector at the given latitude and longitude position.

- Same Sized Vectors
  - The size of the quiver is kept the same at all the positions, but the color of the quiver is proportional to the magnitude of the wind speed. 
  - We experimented with different color palettes provided by the matplotlib library like viridis, plasma and winter and we found that ‘blues’ gave the most suitable and intuitive color mapping for the given dataset. This color palette goes from light blue to dark blue with an increase in magnitude.
  - The direction is determined by the direction of the resultant vector at the given latitude and longitude position.

## Treemap

### How to Generate the Treemaps

1. Make sure that the `Crime_Data_from_2020_to_Present.csv` file is present in the TreeMap folder.
It can be downloaded from `https://catalog.data.gov/dataset/crime-data-from-2020-to-present`

2. Run the `TreemapPreprocessing.ipynb` file to do data processing and generate 3 json files. Each json file is in the form of a tree like structure which will be used in the web application to generate the treemaps.

3. Download the `live server` extension of VS Code and open the `index.html` page. Start the live server, a web application will open in the browser with the 3 different treemaps drawn one below another.

### Dataset Description

Crime Data of Los Angeles dataset, i.e the dataset assigned in A1. The given dataset has details of crimes that have taken place in Los Angeles from the January 2020
to August 2023. There are a total of 28 data fields where each field covers different aspects of the crime that took place. The major data fields that were used for the visualizations are :

- Date OCC : The date of occurrence of the crime.
- Area Name : The 21 Geographic areas of Los Angeles.
- Crm Cd Desc : Describes the crime.
- LAT, LON : Latitude and Longitude values of the crime.

### Dataset Processing

The dataset was loaded into a python notebook using the pandas library. Then the null value percentages in each column was measured. The columns with more than 40% null values
were removed from the dataset (Weapon Desc had 65% null values but it wasn’t removed as the remaining columns had useful information about crimes with weapons, which helped in generating insightful visualizations) and a new csv file was generated, which was used for the visualizations.

### Implementation 

- The treemaps are made using the d3 library in javascript and to run the website, the live server extension needs to be used. In the web application, the user has the option to change the spatial partitioning of the treemap, i.e Squarify ,Snake, etc allowing for a better understanding of the data. The level can be found out by the thickness of the margin where it decreases with the increase in level.

- Once the data is processed, we remodel the tabular data to a tree like structure which will help in drawing the treemap visualization. Three different experiments have been done on the given dataset, i.e 3 different columns are used to make the treemap visualizations : 

  - Date OCC column where the hierarchy is year -> month. This gives a 2 level hierarchy where the value of the leaf nodes is the number of crimes that took place in that month of the year.
  - Area Name column where the hierarchy is North or South LA -> Area names. This gives a 2 level hierarchy where the parents are North LA and South LA , with the children being the area names that belong to these regions. The values of the leaf nodes are the number of crimes that have taken place in the area name.
  - Crm cd Desc column where the crimes that are similar are grouped , which becomes the first level of hierarchy, and the leaf nodes being the different crimes in the group. The value of the leaf node is the number of crimes that fall under the given crime code description.

Once the hierarchies are determined, a dictionary structure was initialized which had the name and children attributes where children is an array of dictionaries that come under the parent. The dictionaries corresponding to the last level have a value attribute instead of children. These dictionaries are converted to a json file that is used by the d3 library to make the visualization.


