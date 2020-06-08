# Eberron Lighting Rails Calculator (ELRC)

ELRC is a small SPA designed to calculate the distance, travel time and cost of travel by Eberron lighting rails between two stations.

## Table of contents
* [Usage](#usage)
* [Settings](#settings)
  * [Pricing method](#pricing-method)
  * [Distances source](#distances-source)
  * [Custom prices](#custom-prices)
  * [Custom distances](#custom-distances)

## Usage

### Enter stations

Enter start and end station in the _"From..."_ and _"To..."_ forms respectively and press _"Calculate"_ button.

![alt](https://i.imgur.com/Q4x4Aj4.png)

### Results

* **Distance** - distance between stations in miles.
* **Travel time** - travel time in D:H:M format (and layover time).
* **Cost** - travel cost based on different sources (can be specified and set in the settings, see below)
* **Stations** - all stations on the path of the train.

![alt](https://i.imgur.com/zjCRvSy.png)

## Settings

![alt](https://i.imgur.com/BpsaqGV.png)

### Pricing method

Method of pricing.

* **All** - show all pricing methods.
* **ERLW (5E) - per mile** - from *"Eberron: Rising from the Last War"*: **5 sp/mile.**
* **WGtE (5E) - per day** - from *"Wayfinder's Guide to Eberron"*:
  * *Flat* - **1 gp/day (24 hours)**
  * *Flat* - **4 gp/day (24 hours)**
* **ECG (4E) - per mile** - from *"Eberron Campaign Guide"*:
  * *First Class* - **5 sp/mile**
  * *Standard* - **2 sp/mile**
  * *Steerage* - **3 cp/mile**
* **Custom** - custom pricing method (can be set in the settings, see below)

### Distances source

Source of distances between stations (in miles).

* **4E** - distances from [u/The-MQ](https://www.reddit.com/user/The-MQ/)'s [Travel and Khorvaire](https://homebrewery.naturalcrit.com/share/Bk7BNjmYgI#p1) document (based on [4E map](https://vignette.wikia.nocookie.net/eberron/images/f/f4/D%26D_-_4th_Edition_-_Eberron_Map_Khorvaire.jpg/revision/latest?cb=20090819121531)).
* **3E** - distances from [3E map](http://archive.wizards.com/default.asp?x=dnd/ebwe/20041206a).
* **Only custom** - only custom distances from *"Custom distances"* form (see below).

### Speed

Speed of the train in *miles per hour* (default: 30).

### Layover

Time of layover at each station in hours (default: 1, number can be fractional).

### Custom prices

JSON object with custom prices. Each property (that should be named same as a name of method) is an array of objects. Each object in this array is a tier of method and should contain following properties:

* **tier** - name of the tier (e.g. "First class", "Steerage", "Flat").
* **price** - cost of travel (per hour or per mile) in gold (**1 gold** is just **1**, **5 silver** is **0.5**, **3 copper** is **0.03**, etc).
* **pricingMethod** - method of pricing. Can be either **"per mile"** or **"per hour"**.
* **mod** - modifier of pricingMethod (mod of 0.5 with "per hour" is "per 30 minutes", 24 is "per day"; 15 with "per mile" is "per 15 miles", etc.)

You can also change an existing pricing method in this form by their name (e.g. setting name of custom pricing method as "ERLW (5E) - per mile").

---

**"Save"** button saves made changes;

**"Reset"** button resets made changes.

---

Example of **"WGtE (5E) - per day"** pricing method:
```yaml
{
 "WGtE (5E) - per day": [
  {
   "tier": "Flat",
   "price": 1,
   "pricingMethod": "per hour",
   "mod": 24
  },
  {
   "tier": "Luxury",
   "price": 4,
   "pricingMethod": "per hour",
   "mod": 24
  }
 ]
}
```

Example of **"ECG (4E) - per mile"** pricing method:
```yaml
{
 "ECG (4E) - per mile": [
  {
   "tier": "Steerage",
   "price": 0.03,
   "pricingMethod": "per mile",
   "mod": 1
  },
  {
   "tier": "Standard",
   "price": 0.2,
   "pricingMethod": "per mile",
   "mod": 1
  },
  {
   "tier": "First Class",
   "price": 0.5,
   "pricingMethod": "per mile",
   "mod": 1
  }
 ]
}
```

### Custom distances

JSON array with custom distances and stations. Each element should contain 3 elements:

1. Name of the first station.
2. Name of the second station.
3. Distance (in miles) between these stations.

You can change distance between existing stations (e.g. `['Krona Peak', "Irontown", 1000]` - now distance between Krona Peak and Irontown is 1000 miles. Yay!)...

...add rails between existing stations (e.g. by default there are custom rails between Vedykar and Vulyar - it is done by `['Vedykar', "Vulyar", 147]`)...

...and add entirely new stations (e.g.  `["Karrlakton", "Korth", 247]`)!

---

**"Save"** button saves made changes;

**"Reset"** button resets made changes.

---

Examaple of default custom distances:
```yaml
[
 [
  "Thaliost",
  "Rekkenmark",
  27
 ],
 [
  "Vedykar",
  "Vulyar",
  147
 ],
 [
  "Vulyar",
  "Gatherhold",
  302
 ]
]
```

Example of custom distances in my campaign:
```yaml
[
 [
  "Thaliost",
  "Rekkenmark",
  27
 ],
 [
  "Vedykar",
  "Vulyar",
  147
 ],
 [
  "Vulyar",
  "Gatherhold",
  302
 ],
 [
  "Vedykar",
  "Karrlakton",
  123
 ],
 [
  "Karrlakton",
  "Korth",
  247
 ],
 [
  "Marketplace",
  "Sigilstar",
  221
 ],
 [
  "Flamekeep",
  "Passage",
  427
 ],
 [
  "Sharn",
  "Trolanport",
  483
 ],
 [
  "Trolanport",
  "Korranberg",
  379
 ]
]
```
