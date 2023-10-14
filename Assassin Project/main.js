class Survivor {
  constructor(name, trait, death, damage, both) {
    this.name = name;
    this.trait = trait;
    this.death = death; // death prob.
    this.damage = damage; // damage prob.
    this.both = both; // damage and death prob.

    console.log(
      `\t${this.name}\n\t(${this.trait}, ${this.death} death, ${this.damage} damage, ${this.both} both)`
    );
  }
}

class Killer {
  constructor() {
    this.name = "Jason";
    this.hp = 100;
  }
  next(target) {
    let action = Math.random();

    if (0 <= action < target.death) {
      this.hp -= 15;
      console.log(
        `\t${this.name} attacks ${target.name}!\n\t${target.name} dealt 15 points but died!`
      );
      return 1;
    } else if (target.death <= action < target.death + target.damage) {
      console.log(`\t${this.name} killed ${target.name}!`);
      return 1;
    } else if (
      target.death + target.damage <=
      target.death + target.damage + target.both
    ) {
      this.hp -= 10;
      console.log(
        `\t${this.name} attacks ${target.name}!\n\tBut ${target.name} dodged him and dealt 10 points!`
      );
      return 0;
    }
  }
}

let killer = new Killer();

let names = [
  "James",
  "Mary",
  "Robert",
  "Patricia",
  "John",
  "Jennifer",
  "Michael",
  "Linda",
  "David",
  "Elizabeth",
  "William",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
];

// Survivors characteristics: trait, death prob., damage prob., damage and death prob.
let characteristics = [
  ["Weak", 0.7, 0.2, 0.1],
  ["Scared", 0.6, 0.25, 0.15],
  ["Blondy", 0.5, 0.3, 0, 25],
  ["Nerd", 0.4, 0.35, 0.25],
  ["Assistant", 0.3, 0.5, 0.2],
  ["Agile", 0.1, 0.6, 0.3],
  ["Sporty", 0.2, 0.7, 0.1],
  ["Rageous", 0.3, 0.4, 0.3],
  ["Shooter", 0.2, 0.65, 0.15],
];

// Game arrays
let survivors = [];
let deathList = [];

// Creating survivors instances
console.log("The gang ---");
for (let i = 0; i < 5; i++) {
  let name = Math.floor(Math.random() * names.length);
  let char = Math.floor(Math.random() * characteristics.length);
  survivors.push(
    new Survivor(
      names[name],
      characteristics[char][0],
      characteristics[char][1],
      characteristics[char][2],
      characteristics[char][3]
    )
  );
  names.splice(name, 1);
}

console.log("Let's play ! ---");
while (killer.hp > 0 && survivors.length != 0) {
  // console.log(survivors);
  // console.log(deathList);
  selection = Math.floor(Math.random() * survivors.length);
  result = killer.next(survivors[selection]);

  // Death
  if (result == 1) {
    deathList.push(survivors[selection].name);
    survivors.splice(selection, 1);
  }

  // Ending conditions
  if (killer.hp <= 0) {
    if (survivors.length == 0) {
      console.log(`End---\n\tEveryone died!`);
    } else if (deathList == 0) {
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tEveryone survived`
      );
    } else if (deathList.length == 1) {
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tBut ${deathList} is dead`
      );
    } else {
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tBut ${deathList} are dead`
      );
    }
    break;
  } else if (survivors.length == 0) {
    console.log(
      `End ---\n\tOh no! Jason managed to kill every member of the gang! Game over!`
    );
    break;
  }
}
