/**
 * Created by javascript on 22/10/2016.
 */

const department =
    [
        {
            "REGION": 84,
            "DEP": "01",
            "CHEFLIEU": "01053",
            "TNCC": 5,
            "NCC": "AIN",
            "NCCENR": "Ain"
        },
        {
            "REGION": 32,
            "DEP": "02",
            "CHEFLIEU": "02408",
            "TNCC": 5,
            "NCC": "AISNE",
            "NCCENR": "Aisne"
        },
        {
            "REGION": 84,
            "DEP": "03",
            "CHEFLIEU": "03190",
            "TNCC": 5,
            "NCC": "ALLIER",
            "NCCENR": "Allier"
        },
        {
            "REGION": 93,
            "DEP": "04",
            "CHEFLIEU": "04070",
            "TNCC": 4,
            "NCC": "ALPES-DE-HAUTE-PROVENCE",
            "NCCENR": "Alpes-de-Haute-Provence"
        },
        {
            "REGION": 93,
            "DEP": "05",
            "CHEFLIEU": "05061",
            "TNCC": 4,
            "NCC": "HAUTES-ALPES",
            "NCCENR": "Hautes-Alpes"
        },
        {
            "REGION": 93,
            "DEP": "06",
            "CHEFLIEU": "06088",
            "TNCC": 4,
            "NCC": "ALPES-MARITIMES",
            "NCCENR": "Alpes-Maritimes"
        },
        {
            "REGION": 84,
            "DEP": "07",
            "CHEFLIEU": "07186",
            "TNCC": 5,
            "NCC": "ARDECHE",
            "NCCENR": "Ardèche"
        },
        {
            "REGION": 44,
            "DEP": "08",
            "CHEFLIEU": "08105",
            "TNCC": 4,
            "NCC": "ARDENNES",
            "NCCENR": "Ardennes"
        },
        {
            "REGION": 76,
            "DEP": "09",
            "CHEFLIEU": "09122",
            "TNCC": 5,
            "NCC": "ARIEGE",
            "NCCENR": "Ariège"
        },
        {
            "REGION": 44,
            "DEP": "10",
            "CHEFLIEU": "10387",
            "TNCC": 5,
            "NCC": "AUBE",
            "NCCENR": "Aube"
        },
        {
            "REGION": 76,
            "DEP": "11",
            "CHEFLIEU": "11069",
            "TNCC": 5,
            "NCC": "AUDE",
            "NCCENR": "Aude"
        },
        {
            "REGION": 76,
            "DEP": "12",
            "CHEFLIEU": "12202",
            "TNCC": 5,
            "NCC": "AVEYRON",
            "NCCENR": "Aveyron"
        },
        {
            "REGION": 93,
            "DEP": "13",
            "CHEFLIEU": "13055",
            "TNCC": 4,
            "NCC": "BOUCHES-DU-RHONE",
            "NCCENR": "Bouches-du-Rhône"
        },
        {
            "REGION": 28,
            "DEP": "14",
            "CHEFLIEU": "14118",
            "TNCC": 2,
            "NCC": "CALVADOS",
            "NCCENR": "Calvados"
        },
        {
            "REGION": 84,
            "DEP": "15",
            "CHEFLIEU": "15014",
            "TNCC": 2,
            "NCC": "CANTAL",
            "NCCENR": "Cantal"
        },
        {
            "REGION": 75,
            "DEP": "16",
            "CHEFLIEU": "16015",
            "TNCC": 3,
            "NCC": "CHARENTE",
            "NCCENR": "Charente"
        },
        {
            "REGION": 75,
            "DEP": "17",
            "CHEFLIEU": "17300",
            "TNCC": 3,
            "NCC": "CHARENTE-MARITIME",
            "NCCENR": "Charente-Maritime"
        },
        {
            "REGION": 24,
            "DEP": "18",
            "CHEFLIEU": "18033",
            "TNCC": 2,
            "NCC": "CHER",
            "NCCENR": "Cher"
        },
        {
            "REGION": 75,
            "DEP": "19",
            "CHEFLIEU": "19272",
            "TNCC": 3,
            "NCC": "CORREZE",
            "NCCENR": "Corrèze"
        },
        {
            "REGION": 94,
            "DEP": "2A",
            "CHEFLIEU": "2A004",
            "TNCC": 3,
            "NCC": "CORSE-DU-SUD",
            "NCCENR": "Corse-du-Sud"
        },
        {
            "REGION": 94,
            "DEP": "2B",
            "CHEFLIEU": "2B033",
            "TNCC": 3,
            "NCC": "HAUTE-CORSE",
            "NCCENR": "Haute-Corse"
        },
        {
            "REGION": 27,
            "DEP": "21",
            "CHEFLIEU": "21231",
            "TNCC": 3,
            "NCC": "COTE-D'OR",
            "NCCENR": "Côte-d'Or"
        },
        {
            "REGION": 53,
            "DEP": "22",
            "CHEFLIEU": "22278",
            "TNCC": 4,
            "NCC": "COTES-D'ARMOR",
            "NCCENR": "Côtes-d'Armor"
        },
        {
            "REGION": 75,
            "DEP": "23",
            "CHEFLIEU": "23096",
            "TNCC": 3,
            "NCC": "CREUSE",
            "NCCENR": "Creuse"
        },
        {
            "REGION": 75,
            "DEP": "24",
            "CHEFLIEU": "24322",
            "TNCC": 3,
            "NCC": "DORDOGNE",
            "NCCENR": "Dordogne"
        },
        {
            "REGION": 27,
            "DEP": "25",
            "CHEFLIEU": "25056",
            "TNCC": 2,
            "NCC": "DOUBS",
            "NCCENR": "Doubs"
        },
        {
            "REGION": 84,
            "DEP": "26",
            "CHEFLIEU": "26362",
            "TNCC": 3,
            "NCC": "DROME",
            "NCCENR": "Drôme"
        },
        {
            "REGION": 28,
            "DEP": "27",
            "CHEFLIEU": "27229",
            "TNCC": 5,
            "NCC": "EURE",
            "NCCENR": "Eure"
        },
        {
            "REGION": 24,
            "DEP": "28",
            "CHEFLIEU": "28085",
            "TNCC": 1,
            "NCC": "EURE-ET-LOIR",
            "NCCENR": "Eure-et-Loir"
        },
        {
            "REGION": 53,
            "DEP": "29",
            "CHEFLIEU": "29232",
            "TNCC": 2,
            "NCC": "FINISTERE",
            "NCCENR": "Finistère"
        },
        {
            "REGION": 76,
            "DEP": "30",
            "CHEFLIEU": "30189",
            "TNCC": 2,
            "NCC": "GARD",
            "NCCENR": "Gard"
        },
        {
            "REGION": 76,
            "DEP": "31",
            "CHEFLIEU": "31555",
            "TNCC": 3,
            "NCC": "HAUTE-GARONNE",
            "NCCENR": "Haute-Garonne"
        },
        {
            "REGION": 76,
            "DEP": "32",
            "CHEFLIEU": "32013",
            "TNCC": 2,
            "NCC": "GERS",
            "NCCENR": "Gers"
        },
        {
            "REGION": 75,
            "DEP": "33",
            "CHEFLIEU": "33063",
            "TNCC": 3,
            "NCC": "GIRONDE",
            "NCCENR": "Gironde"
        },
        {
            "REGION": 76,
            "DEP": "34",
            "CHEFLIEU": "34172",
            "TNCC": 5,
            "NCC": "HERAULT",
            "NCCENR": "Hérault"
        },
        {
            "REGION": 53,
            "DEP": "35",
            "CHEFLIEU": "35238",
            "TNCC": 1,
            "NCC": "ILLE-ET-VILAINE",
            "NCCENR": "Ille-et-Vilaine"
        },
        {
            "REGION": 24,
            "DEP": "36",
            "CHEFLIEU": "36044",
            "TNCC": 5,
            "NCC": "INDRE",
            "NCCENR": "Indre"
        },
        {
            "REGION": 24,
            "DEP": "37",
            "CHEFLIEU": "37261",
            "TNCC": 1,
            "NCC": "INDRE-ET-LOIRE",
            "NCCENR": "Indre-et-Loire"
        },
        {
            "REGION": 84,
            "DEP": "38",
            "CHEFLIEU": "38185",
            "TNCC": 5,
            "NCC": "ISERE",
            "NCCENR": "Isère"
        },
        {
            "REGION": 27,
            "DEP": "39",
            "CHEFLIEU": "39300",
            "TNCC": 2,
            "NCC": "JURA",
            "NCCENR": "Jura"
        },
        {
            "REGION": 75,
            "DEP": "40",
            "CHEFLIEU": "40192",
            "TNCC": 4,
            "NCC": "LANDES",
            "NCCENR": "Landes"
        },
        {
            "REGION": 24,
            "DEP": "41",
            "CHEFLIEU": "41018",
            "TNCC": 2,
            "NCC": "LOIR-ET-CHER",
            "NCCENR": "Loir-et-Cher"
        },
        {
            "REGION": 84,
            "DEP": "42",
            "CHEFLIEU": "42218",
            "TNCC": 3,
            "NCC": "LOIRE",
            "NCCENR": "Loire"
        },
        {
            "REGION": 84,
            "DEP": "43",
            "CHEFLIEU": "43157",
            "TNCC": 3,
            "NCC": "HAUTE-LOIRE",
            "NCCENR": "Haute-Loire"
        },
        {
            "REGION": 52,
            "DEP": "44",
            "CHEFLIEU": "44109",
            "TNCC": 3,
            "NCC": "LOIRE-ATLANTIQUE",
            "NCCENR": "Loire-Atlantique"
        },
        {
            "REGION": 24,
            "DEP": "45",
            "CHEFLIEU": "45234",
            "TNCC": 2,
            "NCC": "LOIRET",
            "NCCENR": "Loiret"
        },
        {
            "REGION": 76,
            "DEP": "46",
            "CHEFLIEU": "46042",
            "TNCC": 2,
            "NCC": "LOT",
            "NCCENR": "Lot"
        },
        {
            "REGION": 75,
            "DEP": "47",
            "CHEFLIEU": "47001",
            "TNCC": 2,
            "NCC": "LOT-ET-GARONNE",
            "NCCENR": "Lot-et-Garonne"
        },
        {
            "REGION": 76,
            "DEP": "48",
            "CHEFLIEU": "48095",
            "TNCC": 3,
            "NCC": "LOZERE",
            "NCCENR": "Lozère"
        },
        {
            "REGION": 52,
            "DEP": "49",
            "CHEFLIEU": "49007",
            "TNCC": 2,
            "NCC": "MAINE-ET-LOIRE",
            "NCCENR": "Maine-et-Loire"
        },
        {
            "REGION": 28,
            "DEP": "50",
            "CHEFLIEU": "50502",
            "TNCC": 3,
            "NCC": "MANCHE",
            "NCCENR": "Manche"
        },
        {
            "REGION": 44,
            "DEP": "51",
            "CHEFLIEU": "51108",
            "TNCC": 3,
            "NCC": "MARNE",
            "NCCENR": "Marne"
        },
        {
            "REGION": 44,
            "DEP": "52",
            "CHEFLIEU": "52121",
            "TNCC": 3,
            "NCC": "HAUTE-MARNE",
            "NCCENR": "Haute-Marne"
        },
        {
            "REGION": 52,
            "DEP": "53",
            "CHEFLIEU": "53130",
            "TNCC": 3,
            "NCC": "MAYENNE",
            "NCCENR": "Mayenne"
        },
        {
            "REGION": 44,
            "DEP": "54",
            "CHEFLIEU": "54395",
            "TNCC": 0,
            "NCC": "MEURTHE-ET-MOSELLE",
            "NCCENR": "Meurthe-et-Moselle"
        },
        {
            "REGION": 44,
            "DEP": "55",
            "CHEFLIEU": "55029",
            "TNCC": 3,
            "NCC": "MEUSE",
            "NCCENR": "Meuse"
        },
        {
            "REGION": 53,
            "DEP": "56",
            "CHEFLIEU": "56260",
            "TNCC": 2,
            "NCC": "MORBIHAN",
            "NCCENR": "Morbihan"
        },
        {
            "REGION": 44,
            "DEP": "57",
            "CHEFLIEU": "57463",
            "TNCC": 3,
            "NCC": "MOSELLE",
            "NCCENR": "Moselle"
        },
        {
            "REGION": 27,
            "DEP": "58",
            "CHEFLIEU": "58194",
            "TNCC": 3,
            "NCC": "NIEVRE",
            "NCCENR": "Nièvre"
        },
        {
            "REGION": 32,
            "DEP": "59",
            "CHEFLIEU": "59350",
            "TNCC": 2,
            "NCC": "NORD",
            "NCCENR": "Nord"
        },
        {
            "REGION": 32,
            "DEP": "60",
            "CHEFLIEU": "60057",
            "TNCC": 5,
            "NCC": "OISE",
            "NCCENR": "Oise"
        },
        {
            "REGION": 28,
            "DEP": "61",
            "CHEFLIEU": "61001",
            "TNCC": 5,
            "NCC": "ORNE",
            "NCCENR": "Orne"
        },
        {
            "REGION": 32,
            "DEP": "62",
            "CHEFLIEU": "62041",
            "TNCC": 2,
            "NCC": "PAS-DE-CALAIS",
            "NCCENR": "Pas-de-Calais"
        },
        {
            "REGION": 84,
            "DEP": "63",
            "CHEFLIEU": "63113",
            "TNCC": 2,
            "NCC": "PUY-DE-DOME",
            "NCCENR": "Puy-de-Dôme"
        },
        {
            "REGION": 75,
            "DEP": "64",
            "CHEFLIEU": "64445",
            "TNCC": 4,
            "NCC": "PYRENEES-ATLANTIQUES",
            "NCCENR": "Pyrénées-Atlantiques"
        },
        {
            "REGION": 76,
            "DEP": "65",
            "CHEFLIEU": "65440",
            "TNCC": 4,
            "NCC": "HAUTES-PYRENEES",
            "NCCENR": "Hautes-Pyrénées"
        },
        {
            "REGION": 76,
            "DEP": "66",
            "CHEFLIEU": "66136",
            "TNCC": 4,
            "NCC": "PYRENEES-ORIENTALES",
            "NCCENR": "Pyrénées-Orientales"
        },
        {
            "REGION": 44,
            "DEP": "67",
            "CHEFLIEU": "67482",
            "TNCC": 2,
            "NCC": "BAS-RHIN",
            "NCCENR": "Bas-Rhin"
        },
        {
            "REGION": 44,
            "DEP": "68",
            "CHEFLIEU": "68066",
            "TNCC": 2,
            "NCC": "HAUT-RHIN",
            "NCCENR": "Haut-Rhin"
        },
        {
            "REGION": 84,
            "DEP": "69",
            "CHEFLIEU": "69123",
            "TNCC": 2,
            "NCC": "RHONE",
            "NCCENR": "Rhône"
        },
        {
            "REGION": 27,
            "DEP": "70",
            "CHEFLIEU": "70550",
            "TNCC": 3,
            "NCC": "HAUTE-SAONE",
            "NCCENR": "Haute-Saône"
        },
        {
            "REGION": 27,
            "DEP": "71",
            "CHEFLIEU": "71270",
            "TNCC": 0,
            "NCC": "SAONE-ET-LOIRE",
            "NCCENR": "Saône-et-Loire"
        },
        {
            "REGION": 52,
            "DEP": "72",
            "CHEFLIEU": "72181",
            "TNCC": 3,
            "NCC": "SARTHE",
            "NCCENR": "Sarthe"
        },
        {
            "REGION": 84,
            "DEP": "73",
            "CHEFLIEU": "73065",
            "TNCC": 3,
            "NCC": "SAVOIE",
            "NCCENR": "Savoie"
        },
        {
            "REGION": 84,
            "DEP": "74",
            "CHEFLIEU": "74010",
            "TNCC": 3,
            "NCC": "HAUTE-SAVOIE",
            "NCCENR": "Haute-Savoie"
        },
        {
            "REGION": 11,
            "DEP": "75",
            "CHEFLIEU": "75056",
            "TNCC": 0,
            "NCC": "PARIS",
            "NCCENR": "Paris"
        },
        {
            "REGION": 28,
            "DEP": "76",
            "CHEFLIEU": "76540",
            "TNCC": 3,
            "NCC": "SEINE-MARITIME",
            "NCCENR": "Seine-Maritime"
        },
        {
            "REGION": 11,
            "DEP": "77",
            "CHEFLIEU": "77288",
            "TNCC": 0,
            "NCC": "SEINE-ET-MARNE",
            "NCCENR": "Seine-et-Marne"
        },
        {
            "REGION": 11,
            "DEP": "78",
            "CHEFLIEU": "78646",
            "TNCC": 4,
            "NCC": "YVELINES",
            "NCCENR": "Yvelines"
        },
        {
            "REGION": 75,
            "DEP": "79",
            "CHEFLIEU": "79191",
            "TNCC": 4,
            "NCC": "DEUX-SEVRES",
            "NCCENR": "Deux-Sèvres"
        },
        {
            "REGION": 32,
            "DEP": "80",
            "CHEFLIEU": "80021",
            "TNCC": 3,
            "NCC": "SOMME",
            "NCCENR": "Somme"
        },
        {
            "REGION": 76,
            "DEP": "81",
            "CHEFLIEU": "81004",
            "TNCC": 2,
            "NCC": "TARN",
            "NCCENR": "Tarn"
        },
        {
            "REGION": 76,
            "DEP": "82",
            "CHEFLIEU": "82121",
            "TNCC": 2,
            "NCC": "TARN-ET-GARONNE",
            "NCCENR": "Tarn-et-Garonne"
        },
        {
            "REGION": 93,
            "DEP": "83",
            "CHEFLIEU": "83137",
            "TNCC": 2,
            "NCC": "VAR",
            "NCCENR": "Var"
        },
        {
            "REGION": 93,
            "DEP": "84",
            "CHEFLIEU": "84007",
            "TNCC": 2,
            "NCC": "VAUCLUSE",
            "NCCENR": "Vaucluse"
        },
        {
            "REGION": 52,
            "DEP": "85",
            "CHEFLIEU": "85191",
            "TNCC": 3,
            "NCC": "VENDEE",
            "NCCENR": "Vendée"
        },
        {
            "REGION": 75,
            "DEP": "86",
            "CHEFLIEU": "86194",
            "TNCC": 3,
            "NCC": "VIENNE",
            "NCCENR": "Vienne"
        },
        {
            "REGION": 75,
            "DEP": "87",
            "CHEFLIEU": "87085",
            "TNCC": 3,
            "NCC": "HAUTE-VIENNE",
            "NCCENR": "Haute-Vienne"
        },
        {
            "REGION": 44,
            "DEP": "88",
            "CHEFLIEU": "88160",
            "TNCC": 4,
            "NCC": "VOSGES",
            "NCCENR": "Vosges"
        },
        {
            "REGION": 27,
            "DEP": "89",
            "CHEFLIEU": "89024",
            "TNCC": 5,
            "NCC": "YONNE",
            "NCCENR": "Yonne"
        },
        {
            "REGION": 27,
            "DEP": "90",
            "CHEFLIEU": "90010",
            "TNCC": 2,
            "NCC": "TERRITOIRE DE BELFORT",
            "NCCENR": "Territoire de Belfort"
        },
        {
            "REGION": 11,
            "DEP": "91",
            "CHEFLIEU": "91228",
            "TNCC": 5,
            "NCC": "ESSONNE",
            "NCCENR": "Essonne"
        },
        {
            "REGION": 11,
            "DEP": "92",
            "CHEFLIEU": "92050",
            "TNCC": 4,
            "NCC": "HAUTS-DE-SEINE",
            "NCCENR": "Hauts-de-Seine"
        },
        {
            "REGION": 11,
            "DEP": "93",
            "CHEFLIEU": "93008",
            "TNCC": 3,
            "NCC": "SEINE-SAINT-DENIS",
            "NCCENR": "Seine-Saint-Denis"
        },
        {
            "REGION": 11,
            "DEP": "94",
            "CHEFLIEU": "94028",
            "TNCC": 2,
            "NCC": "VAL-DE-MARNE",
            "NCCENR": "Val-de-Marne"
        },
        {
            "REGION": 11,
            "DEP": "95",
            "CHEFLIEU": "95500",
            "TNCC": 2,
            "NCC": "VAL-D'OISE",
            "NCCENR": "Val-d'Oise"
        },
        {
            "REGION": 1,
            "DEP": "971",
            "CHEFLIEU": "97105",
            "TNCC": 3,
            "NCC": "GUADELOUPE",
            "NCCENR": "Guadeloupe"
        },
        {
            "REGION": 2,
            "DEP": "972",
            "CHEFLIEU": "97209",
            "TNCC": 3,
            "NCC": "MARTINIQUE",
            "NCCENR": "Martinique"
        },
        {
            "REGION": 3,
            "DEP": "973",
            "CHEFLIEU": "97302",
            "TNCC": 3,
            "NCC": "GUYANE",
            "NCCENR": "Guyane"
        },
        {
            "REGION": 4,
            "DEP": "974",
            "CHEFLIEU": "97411",
            "TNCC": 0,
            "NCC": "LA REUNION",
            "NCCENR": "La Réunion"
        },
        {
            "REGION": 6,
            "DEP": "976",
            "CHEFLIEU": "97608",
            "TNCC": 0,
            "NCC": "MAYOTTE",
            "NCCENR": "Mayotte"
        }
    ];
module.exports = department;