class Car{
  #brand;
  #model;
  speed=0;
  isTrunkOpen=true;
  constructor(carDetails){
    this.#brand=carDetails.brand;
    this.#model=carDetails.model;
  }

  go(){
    if(this.speed<195 && (this.isTrunkOpen===false)){
      this.speed+=5;
    }
  }

  brake(){
    if(this.speed>5){
      this.speed-=5;
    }
  }

  displayInfo(){
    console.log(`${this.#brand},${this.#model},${this.speed}`);
  }

  openTrunk(){
    if(this.speed<=0){
      this.isTrunkOpen=true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen=false;
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration=carDetails.acceleration;
    console.log(this.acceleration,this.speed);

  }

  openTrunk(){
    this.isTrunkOpen=false;
  }

  closeTrunk(){
    this.isTrunkOpen=false;
  }

  go(){
    if(this.speed<300){
      this.speed=this.speed+this.acceleration;
    }
    
  }
}

const toyota=new Car({brand:"Toyota",model:"Corolla"});
const tesla=new Car({brand:'Tesla',model:'Model 3'});
const Mclaren=new RaceCar({brand:'Mclaren',model:'F1',acceleration:20});

Mclaren.go();
Mclaren.displayInfo();

toyota.brand='maruthi';
toyota.displayInfo();

toyota.go();
toyota.openTrunk();
tesla.go();
tesla.brake();
tesla.brake();
toyota.go();
toyota.brake();
toyota.displayInfo();
tesla.displayInfo();

