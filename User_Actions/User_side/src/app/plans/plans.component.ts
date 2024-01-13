import { Component,Input,OnInit} from '@angular/core';
import { BasicPlanService } from './basic-plan-component.service';
import { i_plans } from './plans';
import { ProfileService } from '../profilepage/Profileservice.service';
import { Iuser } from '../users';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit{
  
  

  planDetails !: i_plans;
  public USsure:boolean =false;
  public USchange:boolean =false;
 
  constructor(private basicPlanService: BasicPlanService,private profileService :ProfileService) {
}
 
  
  ngOnInit() {
    
    
  const id:number=1;
    this.basicPlanService.getPlans(this.profileService.getPlanname(),this.profileService.getPlanid()).subscribe(data=>{
      
        this.planDetails=data;
         this.planDetails.id=data.id;
         this.planDetails.billing_cycle=data.billing_cycle,
         this.planDetails.plan_name=data.plan_name,
         this.planDetails.plan_speed=data.plan_speed, 
         this.planDetails.plan_price=data.plan_price
        });
        // console.log(this.planDetails.id)

       
  }


   unsub()
   {
    this.USsure = false;
     console.log("enterded unsub");
 this.profileService.delete().subscribe(
        
        
     error=> console.error('Error Deleting Plan',error));
   }

UChange()
{
  console.log("I got Toggle Change clicked")
  if(this.USchange){
    this.USchange = false;
  }
  else{
    this.USchange = true;
  }
}




UnSubToggle()
{
  console.log("I got Toggle Sub clicked")
  if(this.USsure){
    this.USsure = false;
  }
  else{
    this.USsure = true;
  }
}

}









 
  

