function solve(input){
    let carNum = Number(input.shift());
    let garage = {};
    for( i = 0; i < carNum; i++){
       let [myCars, mileage, fuel] = input.shift().split('|');
       mileage = Number(mileage);
       fuel = Number(fuel);
 
       garage[myCars] = {mileage, fuel};
    }
    let commandLine = input.shift();
    while(commandLine !== 'Stop'){
       let[command, car, firstArgument, secondArgument] = commandLine.split(' : ');
       switch(command){
          case 'Drive': {
             let distance = Number(firstArgument);
             let fuel = Number(secondArgument);
             if(garage[car].fuel >= fuel){
                garage[car].mileage += distance;
                garage[car].fuel -= fuel;
                console.log(`${car} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);
                if(garage[car].mileage >= 100000){
                   delete garage[car];
                   console.log(`Time to sell the ${car}!`);
                }
             }else {
             console.log('Not enough fuel to make that ride');
             }
          }
          break;
          case 'Refuel': {
             let fuel = Number(firstArgument);
             let oldFuel = Number(garage[car].fuel);
             if(oldFuel + fuel >= 75){
                garage[car].fuel = 75;
                console.log(`${car} refueled with ${75 - oldFuel} liters`);
             }
             else{
                garage[car].fuel += fuel;
                console.log(`${car} refueled with ${fuel} liters`);
             }
          }
          break;
          case 'Revert': {
             let km = Number(firstArgument);
             if(garage[car].mileage - km < 10000){
                garage[car].mileage = 10000;
             }
             else{
                garage[car].mileage -= km;
                console.log(`${car} mileage decreased by ${km} kilometers`);
             }
          }
          break;
       }
       commandLine = input.shift();
    }
 
    let carEntries = Object.entries(garage);
    let carSorted = carEntries.sort((a, b) => {
       if(b[1].mileage == a[1].mileage){
          return a[0].localeCompare(b[0]);
       }
       else{
          return b[1].mileage - a[1].mileage;
       }
    });
    for (const kvp of carSorted) {
       console.log(`${kvp[0]} -> Mileage: ${kvp[1].mileage} kms, Fuel in the tank: ${kvp[1].fuel} lt.`);
    }
 }

 solve(['3',
    'Audi A6|38000|62',
    'Mercedes CLS|11000|35',
    'Volkswagen Passat CC|45678|5',
    'Drive : Audi A6 : 543 : 47',
    'Drive : Mercedes CLS : 94 : 11',
    'Drive : Volkswagen Passat CC : 69 : 8',
    'Refuel : Audi A6 : 50',
    'Revert : Mercedes CLS : 500',
    'Revert : Audi A6 : 30000',
    'Stop'
  ]);