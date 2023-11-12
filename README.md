# Quiver Plot

This github repo has the code for thequiver plot implementation for Assignment 2 of the Data Visualization Course.

## Results 

- `Quiver Plot`: Contains the screenshots and the gifs generated for the different quiver plots.
  - [Feb-06-2012.png](Images/Visualization1/Feb-06-2012.png) : Magnitude proportion quiver plot on Feb 6th 2012
  - [Feb-12-2012.png](Images/Visualization1/Feb-12-2012.png) : Magnitude proportion quiver plot on Feb 12th 2012
  - [Feb-06-2012.png](Images1/Visualization%201/Feb-06-2012.png) : Same Size quiver plot on Feb 6th 2012
  - [Feb-12-2012.png](Images1/Visualization%201/Feb-12-2012.png) : Same Size quiver plot on Feb 12th 2012
  - [animated_GMM.gif](Images/Visualization1/animated_GMM.gif) : Animation of the magnitude proportion quiver plot from 6th to 12th Feb 2012.
  - [animated_GMM.gif](Images1/Visualization%201/animated_GMM.gif) : Animation of the same quiver plot from 6th to 12th Feb 2012.


## How to Run the IPython Notebooks

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

## Dataset Description


The quiver plot visualization used the OSCAT Wind Dataset downloaded from the Incois website. 

- The First Six lines of the dataset provide some information about the dataset such as the variable being plotted (zonal wind speed or meridional wind speed in this case), the Flag which denotes a bad value (-1E+34 in this dataset), the number of rows and columns in the dataset and the date on which the data was collected.

- From the 7th line, the data is presented. The dataset follows the following pattern:

  - Each column corresponds to a longitude. The longitudes begin at 0E , go to 180E and then end at 116.5W.
  -  Each row corresponds to a latitude. The latitudes begin at 89.75S and end at 89.75N.
  - Each cell corresponding to a column (longitude) and a row (latitude) contains the zonal wind speed in one dataset and the meridional wind speed in the other at that longitude and latitude.

The datasets were downloaded from Feb 6th 2012 to Feb 12th 2012, where one dataset corresponds to the zonal wind speed and the other corresponds to the meridional wind speed for each day.

## Data Processing

- The datasets were stored as .txt files in separate folders corresponding to the zonal wind speed dataset and the meridional wind speed dataset for each day. 
- These text files were loaded using the ‘glob’ method provided by python. 
- We ignore the first 6 lines and start reading the text file from the 7th line using the ‘read_table’ function of the pandas library. 
- The columns are renamed as follows, the whitespace in the column names are removed, then if ‘E’ is present then it is removed, else if ‘W’ is present, then the W is removed and the negation of the value is taken.
- The BAD_FLAG in the dataset is replaced with null values.
- The data frames corresponding to each attribute are stored in separate lists.

## Implementation

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
  - The magnitude at each latitude and longitude position was found as the magnitude of the resultant vector as `magnitude=np.sqrt(U**2 + V**2)`. The final quiver plot was generated by `plt.quiver(lat, lon, U, V,magnitude, cmap='Blues', pivot='middle',scale=40)` where the magnitude array is passed to the function as a parameter.
  - The direction is determined by the direction of the resultant vector at the given latitude and longitude position.



