// http://localhost:5000/api/players/42


const data = 
[
  {
    "age": 25,
    "id": 20355,
    "name": "A. Ramsdale",
    "number": 1,
    "photo": "https://media.api-sports.io/football/players/20355.png",
    "position": "Goalkeeper"
  },
  {
    "age": 28,
    "id": 19465,
    "name": "David Raya",
    "number": 22,
    "photo": "https://media.api-sports.io/football/players/19465.png",
    "position": "Goalkeeper"
  },
  {
    "age": 21,
    "id": 169295,
    "name": "K. Hein",
    "number": 31,
    "photo": "https://media.api-sports.io/football/players/169295.png",
    "position": "Goalkeeper"
  },
  {
    "age": 22,
    "id": 22090,
    "name": "W. Saliba",
    "number": 2,
    "photo": "https://media.api-sports.io/football/players/22090.png",
    "position": "Defender"
  },
  {
    "age": 26,
    "id": 19959,
    "name": "B. White",
    "number": 4,
    "photo": "https://media.api-sports.io/football/players/19959.png",
    "position": "Defender"
  },
  {
    "age": 26,
    "id": 22224,
    "name": "Gabriel Magalhães",
    "number": 6,
    "photo": "https://media.api-sports.io/football/players/22224.png",
    "position": "Defender"
  },
  {
    "age": 22,
    "id": 38746,
    "name": "J. Timber",
    "number": 12,
    "photo": "https://media.api-sports.io/football/players/38746.png",
    "position": "Defender"
  },
  {
    "age": 23,
    "id": 61431,
    "name": "J. Kiwior",
    "number": 15,
    "photo": "https://media.api-sports.io/football/players/61431.png",
    "position": "Defender"
  },
  {
    "age": 32,
    "id": 190,
    "name": "Cédric Soares",
    "number": 17,
    "photo": "https://media.api-sports.io/football/players/190.png",
    "position": "Defender"
  },
  {
    "age": 25,
    "id": 2597,
    "name": "T. Tomiyasu",
    "number": 18,
    "photo": "https://media.api-sports.io/football/players/2597.png",
    "position": "Defender"
  },
  {
    "age": 27,
    "id": 641,
    "name": "O. Zinchenko",
    "number": 35,
    "photo": "https://media.api-sports.io/football/players/641.png",
    "position": "Defender"
  },
  {
    "age": 18,
    "id": 284502,
    "name": "James Lannin-Sweet",
    "number": 73,
    "photo": "https://media.api-sports.io/football/players/284502.png",
    "position": "Defender"
  },
  {
    "age": 17,
    "id": 402329,
    "name": "A. Heaven",
    "number": 79,
    "photo": "https://media.api-sports.io/football/players/402329.png",
    "position": "Defender"
  },
  {
    "age": 19,
    "id": 309505,
    "name": "R. Walters",
    "number": 97,
    "photo": "https://media.api-sports.io/football/players/309505.png",
    "position": "Defender"
  },
  {
    "age": 30,
    "id": 49,
    "name": "T. Partey",
    "number": 5,
    "photo": "https://media.api-sports.io/football/players/49.png",
    "position": "Midfielder"
  },
  {
    "age": 25,
    "id": 37127,
    "name": "M. Ødegaard",
    "number": 8,
    "photo": "https://media.api-sports.io/football/players/37127.png",
    "position": "Midfielder"
  },
  {
    "age": 23,
    "id": 1161,
    "name": "E. Smith Rowe",
    "number": 10,
    "photo": "https://media.api-sports.io/football/players/1161.png",
    "position": "Midfielder"
  },
  {
    "age": 32,
    "id": 2289,
    "name": "Jorginho",
    "number": 20,
    "photo": "https://media.api-sports.io/football/players/2289.png",
    "position": "Midfielder"
  },
  {
    "age": 23,
    "id": 41725,
    "name": "Fábio Vieira",
    "number": 21,
    "photo": "https://media.api-sports.io/football/players/41725.png",
    "position": "Midfielder"
  },
  {
    "age": 31,
    "id": 1452,
    "name": "Mohamed Elneny",
    "number": 25,
    "photo": "https://media.api-sports.io/football/players/1452.png",
    "position": "Midfielder"
  },
  {
    "age": 24,
    "id": 978,
    "name": "K. Havertz",
    "number": 29,
    "photo": "https://media.api-sports.io/football/players/978.png",
    "position": "Midfielder"
  },
  {
    "age": 19,
    "id": 284540,
    "name": "Mauro Bandeira",
    "number": 40,
    "photo": "https://media.api-sports.io/football/players/284540.png",
    "position": "Midfielder"
  },
  {
    "age": 24,
    "id": 2937,
    "name": "D. Rice",
    "number": 41,
    "photo": "https://media.api-sports.io/football/players/2937.png",
    "position": "Midfielder"
  },
  {
    "age": 16,
    "id": 313245,
    "name": "M. Lewis-Skelly",
    "number": 59,
    "photo": "https://media.api-sports.io/football/players/313245.png",
    "position": "Midfielder"
  },
  {
    "age": 16,
    "id": 313236,
    "name": "E. Nwaneri",
    "number": 63,
    "photo": "https://media.api-sports.io/football/players/313236.png",
    "position": "Midfielder"
  },
  {
    "age": 18,
    "id": 309501,
    "name": "A. Cozier-Duberry",
    "number": 85,
    "photo": "https://media.api-sports.io/football/players/309501.png",
    "position": "Midfielder"
  },
  {
    "age": 22,
    "id": 1460,
    "name": "B. Saka",
    "number": 7,
    "photo": "https://media.api-sports.io/football/players/1460.png",
    "position": "Attacker"
  },
  {
    "age": 26,
    "id": 643,
    "name": "Gabriel Jesus",
    "number": 9,
    "photo": "https://media.api-sports.io/football/players/643.png",
    "position": "Attacker"
  },
  {
    "age": 22,
    "id": 127769,
    "name": "Gabriel Martinelli",
    "number": 11,
    "photo": "https://media.api-sports.io/football/players/127769.png",
    "position": "Attacker"
  },
  {
    "age": 24,
    "id": 1468,
    "name": "E. Nketiah",
    "number": 14,
    "photo": "https://media.api-sports.io/football/players/1468.png",
    "position": "Attacker"
  },
  {
    "age": 29,
    "id": 1946,
    "name": "L. Trossard",
    "number": 19,
    "photo": "https://media.api-sports.io/football/players/1946.png",
    "position": "Attacker"
  },
  {
    "age": 24,
    "id": 727,
    "name": "R. Nelson",
    "number": 24,
    "photo": "https://media.api-sports.io/football/players/727.png",
    "position": "Attacker"
  },
  {
    "age": 18,
    "id": 284571,
    "name": "C. Sagoe",
    "number": null,
    "photo": "https://media.api-sports.io/football/players/284571.png",
    "position": "Attacker"
  }
]

export default data;