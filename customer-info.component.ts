import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,AbstractControl ,FormArray} from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent {

  form:FormGroup=new FormGroup({
    
    name:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    machine:new FormControl(''),
    amount:new FormControl('')
   
  });

  submitted=false;
  constructor(private fb:FormBuilder){}

  ngOnInit():void{
    this.form=this.fb.group({
      name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(40)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      skills:this.fb.array([]),
      machine:['',[Validators.required]],
      amount:['',[Validators.required,Validators.min(0)]]
    },
    );
  }

  get f():{[key:string]:AbstractControl}
  {
    return this.form.controls;
  }

  get skillsForms() {
    return this.form.get('skills') as FormArray;
  }

  add() {
    this.skillsForms.push(
      this.fb.group({
        machine: [''],
        amount: ['0']
      })
    );
  }


  remove(index: number) {
    this.skillsForms.removeAt(index);
  }


  onSubmit():void{
    this.submitted=true;
    
  }

  onReset():void{
    this.submitted=false;
    this.form.reset();
  }
}