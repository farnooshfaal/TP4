// global variable declaration so they can be used in code
var legend = document.getElementById("state-legend");
var headd = document.getElementById("headd");
var myInterval;
let status = 1;
let layer20remove = false;
let layerIncomeRemove = false;
// This is handle checkbox change function which trigger events every time any item in list is checked or unchecked
function handleCheckboxChange(event) {
  // get the state of menu item if it is checked then true it not then false
  const isChecked = event.target.checked;
  //get the name of menu item that which one is clicked
  const itemName = event.target.name;

  console.log(`${itemName} is ${isChecked ? "checked" : "unchecked"}`);

  if (itemName === "item1" && isChecked) {
    // if item 1 is checked then add the layer crime points on the map
    map.addLayer({
      id: "crim",
      type: "circle",
      source: "criminals",
      paint: {
        "circle-radius": 5,
        "circle-color": "#EE4B2B",
      },
    });
    //create popup
    var popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    //add mouse hover event listener to the map so every time cursor is over crime get its category and show in the popup
    map.on("mouseenter", "crim", function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.CATEGORIE;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates)
        .setHTML(`Category: ${description}`)
        .addTo(map);
    });
    //remove popup if not over the crime
    map.on("mouseleave", "crim", function () {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
  } else if (itemName === "item1" && !isChecked) {
    //if layer 1 is unchecked then remove the layer 1
    map.removeLayer("crim");
  } else if (itemName === "item2" && isChecked) {
    // if item2 name crime 19 is checked then get the layer  and add it to the map
    const overlaymap = document.getElementById("map-overlay");
    document.getElementById(
      "pd"
    ).innerHTML = `We find that there is a high risk of crimes in Montreal North, Tétreauville, Le Plateau/Downtown area, Westmount, and Verdun. Nonetheless, the crime risk is lower in areas such as Mont-Royal, Pierrefonds, Kirkland and Ville Saint-Laurent, including others.
This analysis shows consistent results that there is a higher risk of crimes in urban areas than in residential neighborhoods around the West and the East of the island.
We find a higher risk of crime in neighborhoods that are known to be not so safe, especially in Montreal North and the downtown area. This explains the presence of a higher number of police stations in areas that are determined to be a high risk of crime. `;

    overlaymap.style.display = "block";
    var layers = map.getStyle().layers;
    var firstSymbolId;

    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    map.addLayer(
      {
        id: "buiild",
        type: "fill",
        source: "buildings",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            //get the N_CRIME_19 column from the data and give different color to different values to
            //create a choropleth map
            ["get", "N_CRIME_19"],
            0,
            "#fff5eb",
            2,
            "#fee6ce",
            3,
            "#fdd0a2",
            4,
            "#fdae6b",
            5,
            "#fd8d3c",
            6,
            "#f16913",
            7,
            "#d94801",
            8,
            "#8c2d04",
            9,
            "#7B3F00",
            10,
            "#834333",
          ],
          "fill-opacity": 1,
        },
      },
      firstSymbolId
    );
    //display legend
    legend.style.display = "block";
    // set the content of legned
    headd.innerHTML = `Robberies in Montreal in 2019 </br>  choropleth map legend`;
    //display chart
    const ch = document.getElementById("chartMain");
    ch.style.display = "flex";
    //add boundary of the layer
    map.addLayer(
      {
        id: "outline19",
        type: "line",
        source: "buildings",
        layout: {},
        paint: {
          "line-color": "#000", // black outline
          "line-width": 1,
        },
      },
      firstSymbolId
    );
  } else if (itemName === "item2" && !isChecked) {
    //when item 2 is unchecked remove the added chart
    const chs = document.getElementById("chartMain");
    chs.style.display = "none";
    //remove the added layers
    map.removeLayer("outline19");
    map.removeLayer("buiild");
    //remove lagend
    legend.style.display = "none";
  } else if (itemName === "item3" && isChecked) {
    //If item3 is checked  add map overlay legend and layers
    const overlaymap = document.getElementById("map-overlay");
    document.getElementById(
      "pd"
    ).innerHTML = `We find that there is a high risk of crimes in Montreal North, Tétreauville, Le Plateau/Downtown area, Westmount, and Verdun. Nonetheless, the crime risk is lower in areas such as Mont-Royal, Pierrefonds, Kirkland and Ville Saint-Laurent, including others.
This analysis shows consistent results that there is a higher risk of crimes in urban areas than in residential neighborhoods around the West and the East of the island.
We find a higher risk of crime in neighborhoods that are known to be not so safe, especially in Montreal North and the downtown area. This explains the presence of a higher number of police stations in areas that are determined to be a high risk of crime. `;

    overlaymap.style.display = "block";
    //add legend
    legend.style.display = "block";
    headd.innerHTML = `Robberies in Montreal in 2020 </br>  choropleth map legend`;
    //add chart
    const ch20 = document.getElementById("chartMain20");
    ch20.style.display = "flex";
    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    //add layer and set its style
    map.addLayer(
      {
        id: "build",
        type: "fill",
        source: "buildings",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "N_CRIME_20"],
            1,
            "#fff5eb",
            2,
            "#fee6ce",
            3,
            "#fdd0a2",
            4,
            "#fdae6b",
            5,
            "#fd8d3c",
            6,
            "#f16913",
            7,
            "#d94801",
            8,
            "#8c2d04",
          ],
          "fill-opacity": 1,
        },
      },
      firstSymbolId
    );
    //add layer of boundry of each polygon
    map.addLayer(
      {
        id: "outline20",
        type: "line",
        source: "buildings",
        layout: {},
        paint: {
          "line-color": "#000", // black outline
          "line-width": 1,
        },
      },
      firstSymbolId
    );
  } else if (itemName === "item3" && !isChecked) {
    //item 3 unchecked then remove every thing added like layers, legend, chart and overlay
    const overlaymap = document.getElementById("map-overlay");
    overlaymap.style.display = "none";
    map.removeLayer("build");
    map.removeLayer("outline20");
    legend.style.display = "none";
    const chs20 = document.getElementById("chartMain20");
    chs20.style.display = "none";
  } else if (itemName === "item4" && isChecked) {
    //add building layer data source
    map.addSource("floorplan", {
      // GeoJSON Data source used in vector tiles, documented at
      // https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
      type: "geojson",
      data: "https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/buil/FeatureServer/0/query?f=pgeojson&where=1=1",
    });
    //add building layer to map
    map.addLayer({
      id: "room-extrusion",
      type: "fill-extrusion",
      source: "floorplan",
      paint: {
        //fill-extrusion-color
        "fill-extrusion-color": "#A9A9A9",

        //  fill-extrusion-height
        "fill-extrusion-height": 80,

        // Get fill-extrusion-base from the source 'base_height' property.
        "fill-extrusion-base": ["get", "base_height"],

        // opacity
        "fill-extrusion-opacity": 0.8,
      },
    });
  } else if (itemName === "item4" && !isChecked) {
    //remove layer of building and data source when unchecked
    map.removeLayer("room-extrusion");
    map.removeSource("floorplan");
  } else if (itemName === "item5" && isChecked) {
    //add Map overlay of annual avg income
    const overlaymap = document.getElementById("map-overlay");
    //set content of overlay
    document.getElementById(
      "pd"
    ).innerHTML = `The annual median income seemed to be a decent variable to compare crime rates to.
Our hypothesis is that crimes are more likely to happen in neighborhoods that are financially struggling compared to other neighborhoods.
With this analysis we are able to determine which census tracts have the lowest median income and which census tracts have a higher median income.
These neighborhoods with the highest annual median income also have the highest risk of criminality on the island. However other neighborhoods with the highest median income such as Baie-d'Urfé, Beaconsfield, Senneville are also census tracts with the lowest crime risk. `;
    overlaymap.style.display = "block";

    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    //add income layer

    map.addLayer(
      {
        id: "avgincome",
        type: "fill",
        source: "buildings",
        //set fill properties of income layer
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "INC_AVG_BT"],

            35814.9986267,
            "#FFFFFF",
            50853.0006409,
            "#fff5eb",
            66496.0021973,
            "#fee6ce",
            82819.0002441,
            "#fdd0a2",
            96011.0015869,
            "#fdae6b",

            99174.0036011,
            "#fd8d3c",
            118135.0021362,

            "#f16913",
            146011.0015869,
            "#d94801",
            171561.0046387,
            "#8c2d04",
          ],
          "fill-opacity": 1,
        },
      },
      firstSymbolId
    );
    //set boundries properties of a layer
    map.addLayer(
      {
        id: "outlineIncome",
        type: "line",
        source: "buildings",
        layout: {},
        paint: {
          "line-color": "#000", // black outline
          "line-width": 1,
        },
      },
      firstSymbolId
    );
  } else if (itemName === "item5" && !isChecked) {
    // if item 5 is unchecked then remove the overlay,and  layers
    const overlaymap = document.getElementById("map-overlay");
    overlaymap.style.display = "none";
    map.removeLayer("avgincome");
    map.removeLayer("outlineIncome");
    legend.style.display = "none";
  } else if (itemName == "item6" && isChecked) {
    //if item 6 Data animation is checked then run this setinterval function after every 5 seconds
    myInterval = setInterval(() => {
      if (status == 1) {
        if (layer20remove) {
          //if crimelayer 20 exist then remove it else
          map.removeLayer("animate20");
          map.removeLayer("outline20");
          legend.style.display = "none";
          const chs20 = document.getElementById("chartMain20");
          chs20.style.display = "none";
        } else if (layerIncomeRemove) {
          //if avg income layer exist then remove the layer
          map.removeLayer("avgincome");
          map.removeLayer("outlineIncome");
          legend.style.display = "none";
        }
        //add the layer of crime in 2019
        var layers = map.getStyle().layers;
        var firstSymbolId;

        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol") {
            firstSymbolId = layers[i].id;
            break;
          }
        }
        //add layer
        map.addLayer(
          {
            id: "animate19",
            type: "fill",
            source: "buildings",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                //get column and set properties like color
                ["get", "N_CRIME_19"],
                0,
                "#fff5eb",
                2,
                "#fee6ce",
                3,
                "#fdd0a2",
                4,
                "#fdae6b",
                5,
                "#fd8d3c",
                6,
                "#f16913",
                7,
                "#d94801",
                8,
                "#8c2d04",
                9,
                "#7B3F00",
                10,
                "#834333",
              ],
              "fill-opacity": 1,
            },
          },
          firstSymbolId
        );
        //show legend and chart
        legend.style.display = "block";
        headd.innerHTML = `Robberies in Montreal in 2019 </br>  choropleth map legend`;
        const ch = document.getElementById("chartMain");
        ch.style.display = "flex";
        map.addLayer(
          {
            id: "outline19",
            type: "line",
            source: "buildings",
            layout: {},
            paint: {
              "line-color": "#000", // black outline
              "line-width": 1,
            },
          },
          firstSymbolId
        );
        status = 2;
      } else if (status == 2) {
        // map.removeLayer("animate19");
        // map.removeLayer("outline19");
        // if status is 2 then add the crime layer of 2020 chart and legend
        layer20remove = true;
        const chs = document.getElementById("chartMain");
        chs.style.display = "none";
        map.removeLayer("outline19");
        map.removeLayer("animate19");
        legend.style.display = "none";
        //add legend for animation
        legend.style.display = "block";
        headd.innerHTML = `Robberies in Montreal in 2020 </br>  choropleth map legend`;
        //add chart
        const ch20 = document.getElementById("chartMain20");
        ch20.style.display = "flex";
        var layers = map.getStyle().layers;
        var firstSymbolId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol") {
            firstSymbolId = layers[i].id;
            break;
          }
        }
        //add layer of crime in 2020
        map.addLayer(
          {
            id: "animate20",
            type: "fill",
            source: "buildings",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                //add the style properties of polygons
                ["get", "N_CRIME_20"],
                1,
                "#fff5eb",
                2,
                "#fee6ce",
                3,
                "#fdd0a2",
                4,
                "#fdae6b",
                5,
                "#fd8d3c",
                6,
                "#f16913",
                7,
                "#d94801",
                8,
                "#8c2d04",
              ],
              "fill-opacity": 1,
            },
          },
          firstSymbolId
        );
        //add layer and style properties of boundries of polygons
        map.addLayer(
          {
            id: "outline20",
            type: "line",
            source: "buildings",
            layout: {},
            paint: {
              "line-color": "#000", // black outline
              "line-width": 1,
            },
          },
          firstSymbolId
        );
        status = 3;
      } else if (status == 3) {
        //add the 3rd layer of animation
        status = 1;
        layerIncomeRemove = true;
        //remove the prvious layers
        map.removeLayer("animate20");
        map.removeLayer("outline20");
        //remove the legend
        legend.style.display = "none";
        //remove the chart
        const chs20 = document.getElementById("chartMain20");
        chs20.style.display = "none";
        legend.style.display = "block";
        headd.innerHTML = `Avgerage Income in Montreal Legend`;
        var layers = map.getStyle().layers;
        var firstSymbolId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol") {
            firstSymbolId = layers[i].id;
            break;
          }
        }

        //add avg income layer to the map
        map.addLayer(
          {
            id: "avgincome",
            type: "fill",
            source: "buildings",

            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", "INC_AVG_BT"],

                35814.9986267,
                "#FFFFFF",
                50853.0006409,
                "#fff5eb",
                66496.0021973,
                "#fee6ce",
                82819.0002441,
                "#fdd0a2",
                96011.0015869,
                "#fdae6b",

                99174.0036011,
                "#fd8d3c",
                118135.0021362,

                "#f16913",
                146011.0015869,
                "#d94801",
                171561.0046387,
                "#8c2d04",
              ],
              "fill-opacity": 1,
            },
          },
          firstSymbolId
        );
        map.addLayer(
          {
            id: "outlineIncome",
            type: "line",
            source: "buildings",
            layout: {},
            paint: {
              "line-color": "#000", // black outline
              "line-width": 1,
            },
          },
          firstSymbolId
        );
      }
    }, 5000);
  } else if (itemName === "item6" && !isChecked) {
    //if data animation layer is unchecked and the interval function exist then
    if (myInterval) {
      clearInterval(myInterval);
      // set all variables to default value
      layer20remove = false;
      status = 1;

      var layers = map.getStyle().layers;

      // Loop through each layer and remove it from the map
      for (var i = 0; i < layers.length; i++) {
        var layerId = layers[i].id;
        console.log("layeridd", layerId);
        if (
          layerId == "outline19" ||
          layerId == "animate19" ||
          layerId == "animat20" ||
          layerId == "outline20" ||
          layerId == "avgincome" ||
          layerId == "outlineIncome"
        ) {
          map.removeLayer(layerId);
          //remove chart of 2019 layer
          const chs = document.getElementById("chartMain");
          chs.style.display = "none";
          //remove legend
          legend.style.display = "none";
          // remove chart of 2020 layer
          const chs20 = document.getElementById("chartMain20");
          chs20.style.display = "none";
        }
      }
    }
  }

  // You can do something with the checked status and the item name here
}
//function for checking if the layer with particular id exist on map or no, it return true or false
function checkLayerExists(map, layerId) {
  const style = map.getStyle();
  const layers = style.layers;
  const matchingLayer = layers.find((layer) => layer.id === layerId);
  return matchingLayer !== undefined;
}
//add map to the project from maplibre library and set the container style center and zoom level
var map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets-v2/style.json?key=Zr0IaTjlaTIX02mmndZ3",
  center: [-73.5674, 45.5019],
  zoom: 11,
  pitch: 40,
  bearing: 20,
  antialias: true,
});

const canvas = document.getElementById("my-chart");

// Create a new Chart.js chart  for 2019 layer
const chart = new Chart(canvas, {
  type: "doughnut", // Set the chart type to 'doughnut'
  data: {
    labels: ["Crime"], // Set the label for the data
    datasets: [
      {
        data: [10, 30],
        backgroundColor: ["#1D4ED8", "#FFFFFF"],
      },
    ],
  },
  options: {
    cutout: "80%", // Set the size of the donut hole
    responsive: false, // Disable automatic resizing
    maintainAspectRatio: false, // Disable aspect ratio locking
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
});
//chart for 2020 crime layer
const canvas2 = document.getElementById("my-chart20");
const chart20 = new Chart(canvas2, {
  type: "doughnut", // Set the chart type to 'doughnut'
  data: {
    labels: ["Crime"], // Set the label for the data
    datasets: [
      {
        data: [10, 30],
        backgroundColor: ["#1D4ED8", "#FFFFFF"],
        // data: [0], // Initialize the data with a value of 0
        // backgroundColor: ["#007bff"], // Set the background color of the chart
      },
    ],
  },
  options: {
    cutout: "80%", // Set the size of the donut hole
    responsive: false, // Disable automatic resizing
    maintainAspectRatio: false, // Disable aspect ratio locking
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  },
});

//add evet listent of map extent change so we can get the value from polygons and put them in chart
map.on("moveend", () => {
  // Get the current bounds of the map
  const bounds = map.getBounds();

  // Query the rendered features within the current bounds of the map
  const layerexist = checkLayerExists(map, "buiild");
  if (layerexist) {
    const features = map.queryRenderedFeatures({
      layers: ["buiild"], // Replace with the ID of your layer
      filter: ["==", "$type", "Polygon"],
      bounds: [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ],
    });

    let sum = 2719;

    // Loop through the features and add up the values of the 'N_CRIME_19' property
    features.forEach((feature) => {
      const data = feature.properties;
      if (data.N_CRIME_19) {
        //get the feature within extend and add the crime in 19 value to chart
        sum += data.N_CRIME_19;
      }
      //add to chart
      chart.data.datasets[0].data = [sum, 18000 - sum];
      // chart.data.datasets[0].data[1] = 20000;
      //update the chart everytime data changes within the extent
      chart.update();
    });
    const chDiv = document.getElementById("chartDiv");
    chDiv.innerHTML = `Crime: ${sum}`;
  }
});
map.on("moveend", () => {
  // Get the current bounds of the map
  const bounds = map.getBounds();
  const layerexists = checkLayerExists(map, "build");
  if (layerexists) {
    // Query the rendered features within the current bounds of the map
    const features = map.queryRenderedFeatures({
      layers: ["build"], // Replace with the ID of your layer
      filter: ["==", "$type", "Polygon"],
      bounds: [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ],
    });

    // Loop through the features and do something with the data
    let sum = 3142;

    // Loop through the features and add up the values of the 'N_CRIME_19' property
    features.forEach((feature) => {
      const data = feature.properties;
      if (data.N_CRIME_20) {
        sum += data.N_CRIME_20;
      }
      chart20.data.datasets[0].data = [sum, 18000 - sum];
      // chart.data.datasets[0].data[1] = 20000;
      chart20.update();
    });
    const chDiv = document.getElementById("chartDiv20");
    chDiv.innerHTML = `Crime: ${sum}`;
  }
});
//ajax function to load the geojson data crimeVehicle
$.ajax({
  url: "./crimevehicle.geojson",
  dataType: "json",
  success: function (data) {
    // Store the data in a variable
    const geojson = data;
    console.log(geojson);
    // Use the data in your application as needed
    // For example, you could add it to a Maplibre map as a source
    map.addSource("buildings", {
      type: "geojson",
      data: geojson,
    });
  },
  error: function (xhr, status, error) {
    console.error("Error loading GeoJSON file:", error);
  },
});
//ajax function to load the data actes-criminels
$.ajax({
  url: "./actes-criminels.geojson",
  dataType: "json",
  success: function (data) {
    // Store the data in a variable
    const geojson = data;
    console.log(geojson);
    // Use the data in your application as needed
    // For example, you could add it to a Maplibre map as a source
    map.addSource("criminals", {
      type: "geojson",
      data: geojson,
    });
  },
  //if error in getting then console the data
  error: function (xhr, status, error) {
    console.error("Error loading GeoJSON file:", error);
  },
});
//get the close button and overlay div
var closeBtn = document.getElementById("close-btn");
var mapOverlay = document.getElementById("map-overlay");
//add event listener so when the user clicks on the cross icon on map overlay it should close it
closeBtn.addEventListener("click", function () {
  mapOverlay.style.display = "none";
});
